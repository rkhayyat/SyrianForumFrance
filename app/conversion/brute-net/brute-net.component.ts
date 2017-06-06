import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import {Router} from '@angular/router';
import {BruteService} from "../../services";
import {BruteNet} from "../../models";

@Component({
  moduleId: module.id,
  selector: "gf-brute-net",
  templateUrl: "brute-net.html"
})

export class BruteNetComponent implements OnInit {
  public smicList:Array<string>;
  smicValue:Array<number>=[9.76, 9.67, 9.61, 9.53, 9.43]; 
	model:BruteNet;
  
  
  constructor(private routerExtensions: RouterExtensions,
              private router: Router,
              private location: Location,
              private bruteService:BruteService) {                  
              }

  ngOnInit(){
    this.smicList = ["janv 2017","janv 2016","janv 2015","janv 2014","janv 2013"];
    this.model =  { 
                    "hourNet":0,
                    "hourBrute":0,
	                  "monthNet":0,
                    "monthBrute":0,
	                  "yearNet":0,
                    "yearBrute":0,
                    "weekHours":35
                    } 
  }

  back(){
    this.location.back();
  }

  goHome(){
    this.routerExtensions.navigate(["/"], { clearHistory: true } );
  }

  // selectedIndexChanged(picker) {
  //   this.calculate(this.smicValue[picker.selectedIndex], 0, 0, 0, 0, 0);
  //   this.model.hourBrute = this.smicValue[picker.selectedIndex];
  // }  

  calculateWithSMIC() {
    this.calculate(9.75, 0, 0, 0, 0, 0);
    this.model.hourBrute = 9.75;
  }

  calculate(hourBrute, hourNet, monthBrute, monthNet, yearBrute, yearNet){
          this.bruteService.calculate(hourBrute, 
                                      hourNet, 
                                      monthBrute, 
                                      monthNet, 
                                      yearBrute, 
                                      yearNet,
                                      this.model.weekHours,
                                      this.model);    
  } 

}