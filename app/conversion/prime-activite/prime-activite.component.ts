import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Page} from "ui/page";
import {Location} from "@angular/common";
import {BackendService, CafService} from "../../services";
import { TextView } from "ui/text-view";
import {CAF} from "../../models";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import {Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: "gf-prime-activite",
  templateUrl: "prime-activite.html"
})
export class PrimeActiviteComponent implements OnInit {
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
    revenus :number=0;
    anotherAide:number=0;
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
  let montantForfaitaire:number = this.cafService.calcRsa(this.rsaObj[0], this.isMarried, this.childrenNum, this.isHouse);
  let bonification :number;
  let etap1:number;
  let etap2:number;

if (this.revenus < 570){
    bonification = 0;
}
else if ((this.revenus > 570) && (this.revenus < 682)){
    bonification = 22;
}
else if ((this.revenus > 682) && (this.revenus < 796)){
    bonification = 44;
}
else if ((this.revenus > 796) ){
    bonification = 67;
}

etap1 = (montantForfaitaire + bonification + 0.62*this.revenus) - this.revenus;
etap2 = montantForfaitaire - this.revenus;
etap2 = (etap2 <0 ?0:etap2);

  let primeActivite:number = (this.revenus <= 0? 0:etap1 - etap2)- this.anotherAide ;
  this.rsaValue = (primeActivite < 15?0:primeActivite);

}

goHome(){
  this.routerExtensions.navigate(["/"], { clearHistory: true } );
}
   
}
