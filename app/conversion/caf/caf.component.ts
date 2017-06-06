import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Page} from "ui/page";
import {Location} from "@angular/common";
import {BackendService, CafService} from "../../services";
import { TextView } from "ui/text-view";
import {CAF} from "../../models";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import {Router} from '@angular/router';
import {confirm} from 'ui/dialogs';
import * as Toast from "nativescript-toast";


@Component({
  moduleId: module.id,
  selector: "gf-caf-list",
  templateUrl: "caf.html"
})
export class CAFComponent implements OnInit {
    id: string;
    date:string; 
    dateValid:string;
    seuleNonEnfant:number; 
    coupleNonEnfant:number; 
    seuleUnEnfant:number; 
    coupleUnEnfant:number; 
    seuleDeuxEnfant:number; 
    coupleDeuxEnfant:number; 
    seuleParEnfantSupp:number; 
    coupleParEnfantSupp:number; 
    forfaitLogUnePer:number; 
    forfaitLogDeuxPer:number; 
    forfaitLogTroisPer:number;
    UID: string ;
    selectedIndex:number;
    public caf: CAF;
    public caf$: Observable<any>;
    public isAnonymous: boolean;
    public isHouse:boolean;
    public isMarried:boolean;
    public childrenNum:number;
    public rsaValue:number;
    public ageList:Array<number>;
    rsaObj:Array<any>;
	
  constructor(private routerExtensions: RouterExtensions,
              private cafService: CafService,
              private router: Router,
              private location: Location) {
                  this.selectedIndex =1;
              }

ngOnInit(){
    this.isHouse=false;
    this.isMarried=false;
    this.rsaValue =0;
    this.ageList = [0,1,2,3,4,5,6,7,8,9,10];
    this.caf$ = <any>this.cafService.getCafValues();
    this.isAnonymous = BackendService.isAnonymous;
    this.caf$.subscribe((rsaObj)=>{
            this.rsaObj = rsaObj;
      }
    );
}
back(){
  this.location.back();
}


selectedIndexChanged(picker) {
        this.childrenNum = this.ageList[picker.selectedIndex];
}    
calcRsa(){
  this.rsaValue = this.cafService.calcRsa(this.rsaObj[0], this.isMarried, this.childrenNum, this.isHouse);

}

goHome(){
  this.routerExtensions.navigate(["/"], { clearHistory: true } );
}
   
}
