import {Observable} from 'rxjs/Observable';
import {Location} from "@angular/common";
import { FirebaseService} from "../../services";
import { TextView } from "ui/text-view";
import {Category} from "../../models";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import {Component, OnInit, ViewChild, ElementRef, ViewContainerRef} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ModalDialogService} from 'nativescript-angular/directives/dialogs';
import {SearchModalComponent} from './search-modal.component';
import {Article} from "../../models";
import {Router, ActivatedRoute} from '@angular/router';



@Component({
  moduleId: module.id,
  selector: "gf-cat-list",
  templateUrl: "cat-list.html"
})
export class CatListComponent implements OnInit {
  @ViewChild("sb") sb: ElementRef; 
    catId: string;
    searchWord:string;
    public categoryTitle:string;
    public categoryList: Array<string>;
    public searchButtonLabel: string = "البحث في جميع الأقسام";
    public category: Category;
    public category$: Observable<any>;
	private articles$: Observable<any>;
    selectedIndex:number;
	isLoading:boolean;
    isLoading2:boolean;
  constructor(private routerExtensions: RouterExtensions,
              private firebaseService: FirebaseService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private modal: ModalDialogService,
              private vcRef: ViewContainerRef) {
                 this.selectedIndex =1;
              }
ngOnInit(){
    this.isLoading= true;
    this.isLoading2= false;
    this.category$ = <any>this.firebaseService.getCategoryList();
    this.category$.subscribe(()=>{
          this.isLoading= false;
    });
}

back(){
  this.location.back();
}
     
viewArticleList(id: string, categoryTitle){
    this.router.navigate(["/list", id, categoryTitle]);
}

logout() {
    this.firebaseService.logout();
    this.routerExtensions.navigate(["/login"], { clearHistory: true } );
}


public showModal(){
        this.firebaseService.queryCategoryList().subscribe(category => {
            this.categoryList=[];
            for (let i = 0; i < category.length; i++) {
                this.categoryList[i]= category[i];
            } 
            let options = {
            context:{categoryList:this.categoryList},
            fullscreen:false,
            viewContainerRef:this.vcRef
        };

      
        this.modal.showModal(SearchModalComponent,options).then(response=>{
            this.searchButtonLabel = "البحث في "+ response.title;
            this.catId = response.id;
        }).catch(err =>{ console.log(err)});

        });
 }
    
    onSubmit(value){ 
        let textViewMySearch : TextView = this.sb.nativeElement;
        if (textViewMySearch.ios) {
            textViewMySearch.ios.endEditing(true);
            textViewMySearch.dismissSoftInput();//close the keyboard
        } else if (textViewMySearch.android) {
            textViewMySearch.android.setFocusable(false);
            textViewMySearch.android.clearFocus();
            textViewMySearch.dismissSoftInput();//close the keyboard
        }

        if (!value) {
            this.articles$ = new BehaviorSubject([]);
        }else {
            this.isLoading2= true;
            this.articles$ = <any>this.firebaseService.getArticleListAll(this.catId,value);
            this.articles$.subscribe(()=>{
                    this.isLoading2= false;
            });
            
        }
    }

    viewDetail(id: string, categoryTitle:string){
        let viewTitle :string = 'كلمة البحث: ' + categoryTitle;    
        this.router.navigate(["/list-detail", id, viewTitle,this.searchWord]);
    }

}





