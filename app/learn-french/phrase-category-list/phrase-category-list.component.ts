import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from "@angular/common";
import { BackendService, CardService } from "../../services";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';


var imageModule = require("ui/image");
var img;

@Component({
  moduleId: module.id,
  selector: "gf-phrase-category-list",
  templateUrl: "phrase-category-list.html"
})
export class PhraseCategoryListComponent implements OnInit {
    public isAnonymous:boolean;
    // public phrases:Array<any>;
    public phraseCat$: Observable<any>;


  constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private cardService: CardService,
        private routerExtensions: RouterExtensions,
  
    ) {

    }


 ngOnInit() {
   
   this.phraseCat$ = <any>this.cardService.getPhraseList();
  
  }

back(){
  this.location.back();
}



goToFlashCards(id: string, title: string){
    this.router.navigate(["/phrase-cards", id, title]);
}

}
