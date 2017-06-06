import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {Location} from "@angular/common";
import {BackendService, FirebaseService} from "../../services";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: "gf-list",
  templateUrl: "list.html"
})
export class ListComponent implements OnInit {
  searchWord:string;
  isLoading:boolean;
  public categoryTitle:string;
  public isAnonymous:boolean;
  public articles$: Observable<any>;
  private sub$: Observable<any>;
  
  constructor(private routerExtensions: RouterExtensions,
              private route: ActivatedRoute,
              private firebaseService: FirebaseService,
              private router: Router,
              private location: Location
    ) {}

ngOnInit(){
  this.isLoading= true;
  this.isAnonymous = BackendService.isAnonymous;
  this.sub$ = this.route.params;

//   this.sub$.subscribe((params: any) => {
//     this.categoryTitle = params['categoryTitle'];
//     this.articles$ = <any>this.firebaseService.getArticleList(params['id']);
// });
  this.articles$ = this.sub$.switchMap((params: any) => {
                              this.categoryTitle = params['categoryTitle'];
                              return <any>this.firebaseService.getArticleList(params['id'])});	

 this.articles$.subscribe(()=>{
           this.isLoading= false;
 });
}

back(){
  this.location.back();
}

isNewDate(publishDate){
    const testedDate = new Date(publishDate);
    const nowDate = new Date();
    let timeDiff = Math.abs(nowDate.getTime() - testedDate.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  return (diffDays < 14)
}

goHome(){
  this.routerExtensions.navigate(["/"], { clearHistory: true } );
}

  viewDetail(id: string, categoryTitle:string){
    if (this.isAnonymous) {

      this.router.navigate(["/list-detail", id, categoryTitle,'']);
      // this.router.navigate(["/list-detail", id, categoryTitle,this.searchWord]);
    } else {
     
      this.router.navigate(["/list-detail", id, categoryTitle,'']);
    }
  }

  
}

