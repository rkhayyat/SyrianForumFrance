import {Component, OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from "@angular/common";
import { BackendService, FirebaseService } from "../../services";
import { Article} from "../../models";
import  * as SocialShare from "nativescript-social-share";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

var imageModule = require("ui/image");
var img;

@Component({
  moduleId: module.id,
  selector: "gf-list-detail",
  templateUrl: "list-detail.html"
})
export class ListDetailComponent implements OnInit {
  id: string;
  title: string;
  text: string;
  textHtml: string;
  imagepath: string;
  searchWord:string;
  private sub$: Observable<any>;
  private imagePath: string;
  public categoryTitle:string;
  public isAnonymous:boolean;
  
  constructor(
        private location: Location,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private firebaseService: FirebaseService,
        private routerExtensions: RouterExtensions 
    ) {}


 ngOnInit() {
  this.isAnonymous= BackendService.isAnonymous;
  this.sub$ = this.route.params;
  this.sub$.switchMap((params:any) =>{
                                        this.categoryTitle = params['categoryTitle'];
                                        this.searchWord = params['searchWord'];
                                      return this.firebaseService.getMyArticle(params['id']);})
             .subscribe((article) => {
                                this.ngZone.run(() => {
                                  for (let prop in article) {
                                    if (prop === "id") {
                                      this.id = article[prop];
                                    }
                                    if (prop === "title") {
                                      this.title = article[prop];
                                    }
                                    if (prop === "text") {

                                      
                                      this.text = article[prop];
                                      this.textHtml = "<span><h5>" + this.text.replace(/\n/g, "<br />")+ "</h5></span>";

                                      if  (this.searchWord !== "") {
                                        let regex = new RegExp(this.searchWord, "g");
                                        this.textHtml =  this.textHtml.replace(regex, "<font color='red'>"+this.searchWord+"</font>");
                                      }
                                    }
                                    if (prop === "imagepath") {
                                      this.imagepath = article[prop];
                                    }                       
                                  }
                                });
                              }); 
  }

back(){
  this.location.back();
}
goHome(){
  this.routerExtensions.navigate(["/"], { clearHistory: true } );
}
shareText() {
  SocialShare.shareText(this.text);
}

onTextViewChange(){
  this.textHtml = "<span><h5>" + this.text.replace(/\n/g, "<br />")+ "</h5></span>";
}

onChangeTextView(){
  this.textHtml = "<span><h1>" + this.text.replace(/\n/g,'<br>') + "</h1></span>";

}
}
