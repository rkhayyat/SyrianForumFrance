import {Injectable, NgZone} from "@angular/core";
import {User, Article, Category} from "../models";
import { BackendService } from "./backend.service";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UtilsService} from './utils.service';
import 'rxjs/add/operator/share';
import * as Toast from "nativescript-toast";

@Injectable()
export class FirebaseService {
  constructor(
    private ngZone: NgZone,
    private utils: UtilsService
  ){}
    
  items: BehaviorSubject<Array<Article>> = new BehaviorSubject([]);
  catItems: BehaviorSubject<Array<Category>> = new BehaviorSubject([]);
  private _allItems: Array<Article> = [];
  private _catAllItems: Array<Category> = [];

  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
          function (result:any) {
            return JSON.stringify(result);
          },
          function (errorMessage:any) {
            alert(errorMessage);
          }
      )
  }
  /*********************This part to login Anonymously**********************************/  
  loginAnonymously() {
  	 return firebase.login({
      type: firebase.LoginType.ANONYMOUS
	}).then((result: any) => {
		BackendService.token = result.uid;
    BackendService.isAnonymous = true;
		return JSON.stringify(result);
	}, (errorMessage: any) => {
		Toast.makeText( errorMessage).show();
	});
  }
  /*********************This part to login with password**********************************/  
  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then((result: any) => {
          BackendService.token = result.uid;
          BackendService.isAnonymous = false;
          return JSON.stringify(result);
      }, (errorMessage: any) => {
        console.log(errorMessage);
        let errorMsg : string = errorMessage;
        if (errorMessage === 'Auth type emailandpassword requires an email and password argument') {
          errorMsg = 'يوجد خطأ بكلمة السر أو الإيميل';
        }
        Toast.makeText(errorMsg).show();
      });
  }

  logout(){
    BackendService.token = "";
    firebase.logout();    
  }
  
  resetPassword(email) {
    return firebase.resetPassword({
    email: email
    }).then((result: any) => {
          alert(JSON.stringify(result));
        },
        function (errorMessage:any) {
          alert(errorMessage);
        }
    ).catch(this.handleErrors);
  }


  getCategoryList(): Observable<any> {
    return new Observable((observer: any) => {
      let path = "Categories";
      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot3(snapshot.value);
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }


  getArticleList(id:string): Observable<any> {
    return new Observable((observer: any) => {
      let path = "Articles";
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value, id);
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

  getArticleListAll(id:string,keyword:string): Observable<any> {
    return new Observable((observer: any) => {
      let path = "Articles";
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            
            let results = this.handleSnapshot2(snapshot.value, keyword, id);
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

  
  queryArticleList(id:string): Observable<any> {
    return new Observable((observer: any) => {
    	let path = "Articles";
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value, id);
             observer.next(results);
          });
        };
        firebase.query(onValueEvent, `/${path}`,  {	singleEvent: true,           
													orderBy: {type: firebase.QueryOrderByType.CHILD,
															  value: 'since' // mandatory when type is 'child'
															}
        });
    }).share();              
  }



  queryCategoryList(): Observable<any> {
    return new Observable((observer: any) => {
    	let path = "Categories";
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot3(snapshot.value);
             observer.next(results);
          });
        };
        firebase.query(onValueEvent, `/${path}`,  {	singleEvent: true,           
													orderBy: {type: firebase.QueryOrderByType.CHILD,
															  value: 'orderNumber' // mandatory when type is 'child'
															}
        });
    }).share();              
  }


  getMyArticle(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allItems.filter(s => s.id === id)[0]);
    }).share();
  }


  getMyMessage(): Observable<any>{
    return new Observable((observer:any) => {
      firebase.getRemoteConfig({
      developerMode: false, // play with this boolean to get more frequent updates during development
      cacheExpirationSeconds: 10, // 10 minutes, default is 12 hours.. set to a lower value during dev
      properties: [{
      key: "message",
      default: "مرحبا بكم في منتدى السوريين في فرنسا"
    }]
  }).then(
        function (result) {
          console.log("Fetched at " + result.lastFetch + (result.throttled ? " (throttled)" : ""));
          for (let entry in result.properties) 
            { 
              observer.next(result.properties[entry]);
            }
        }
    );
  }).share();
}

    
  handleSnapshot(data: any, catId:string) {
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
          if (catId) {
            if(result.categoryId === catId){
               this._allItems.push(result);
            }    

          } else {
            this._allItems.push(result);
          }
      }
      this.publishUpdates();
    }
    return this._allItems;
  }


  handleSnapshot2(data: any,  keyword:string, catId:string) {
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
         if (String(result.text).search(keyword) > 0)  {
            if (catId) {
              if(result.categoryId === catId){
                 this._allItems.push(result);
              }    
            } else {
              this._allItems.push(result);
            }
         }
      }
      this.publishUpdates();
    }
    return this._allItems;
  }


handleSnapshot3(data: any) {
    //empty array, then refill and filter
    this._catAllItems = [];
    if (data) {

      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        this._catAllItems.push(result);
      }
      this.publishUpdates3();
    }
    return this._catAllItems;
  }

   publishUpdates3() {
    // here, we sort must emit a *new* value (immutability!)
    this._catAllItems.sort(function(a, b){
        if(parseInt(a.orderNumber) > parseInt(b.orderNumber)) return -1;
        if(parseInt(a.orderNumber) < parseInt(b.orderNumber)) return 1;
      return 0;
    })
    this.catItems.next([...this._catAllItems]);
  }


   publishUpdates() {
    // here, we sort must emit a *new* value (immutability!)
    this._allItems.sort(function(a, b){
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
      return 0;
    })
    this.items.next([...this._allItems]);
  }



  add(article: string, categoryId:string) {   
    return firebase.push(
        "/Articles",
        { "title": article, 
          "UID": BackendService.token, 
          "date": 0 - Date.now(), 
          "imagepath": "", 
          "text":"",
          "categoryId":categoryId}
      ).then(
        function (result:any) {
          return 'تم إضافة مقالة جديدة';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }); 
  }



  addCategory(title: string,orderNumber:string) {   
    return firebase.push(
        "/Categories",
        { "title": title, 
          "orderNumber":orderNumber,
          "UID": BackendService.token, 
          "date": 0 - Date.now(),
          "descirption":""}
      ).then(
        function (result:any) {
          return 'تم إضافة تصنيف جديد';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }); 
  }


  editCategory(id:string, orderNumber: string){
    this.publishUpdates();
    return firebase.update("/Categories/"+id+"",{
        orderNumber: orderNumber})
      .then(
        function (result:any) {
          return 'قمت بنجاح أسم القسم والأولوية بنجاح';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }

  editArticle(id:string, text: string, imagepath: string){
    this.publishUpdates();
    return firebase.update("/Articles/"+id+"",{
        text: text, 
        imagepath: imagepath})
      .then(
        function (result:any) {
          return 'قمت بنجاح بتعديل نص المقالة';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }

  editDescription(id:string, text: string){
    this.publishUpdates();
    return firebase.update("/Articles/"+id+"",{
        text: text})
      .then(
        function (result:any) {
          return 'قمت بنجاح بتعديل نص المقالة';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }

  delete(article: Article) {
    return firebase.remove("/Articles/"+article.id+"")
      .catch(this.handleErrors);
  }

  deleteImage(pathFile) {
    return firebase.deleteFile({
      remoteFullPath: pathFile
    }).catch(this.handleErrors);
  }
  
  
  deleteCategory(category: Category) {

    return firebase.remove("/Categories/" + category.id + "")
      .catch(this.handleErrors);
  }
  
  uploadFile(localPath: string, file?: any): Promise<any> {
      let filename = this.utils.getFilename(localPath);
      let remotePath = `${filename}`;   
      return firebase.uploadFile({
        remoteFullPath: remotePath,
        localFullPath: localPath,
        onProgress: function(status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
        }
      });
  }

  getDownloadUrl(remoteFilePath: string): Promise<any> {
      return firebase.getDownloadUrl({
        remoteFullPath: remoteFilePath})
      .then(
        function (url:string) {
          return url;
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });
}

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
}