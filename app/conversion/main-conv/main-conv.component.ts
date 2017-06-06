import {Component, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: "gf-main-conv",
  templateUrl: "main-conv.html"
})
export class MainConvComponent implements OnInit {
	
  constructor(private routerExtensions: RouterExtensions,
              private router: Router,
              private location: Location) {
                  
              }

ngOnInit(){

}
back(){
  this.location.back();
}

goToCaf(){
     this.router.navigate(["/caf"]);   
}
goToBruteNet(){
    this.router.navigate(["/brute-net"]);
}
   
}
