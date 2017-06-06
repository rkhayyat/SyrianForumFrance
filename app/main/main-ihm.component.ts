import {Component, OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {FirebaseService} from '../services';
import {Router} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
var utilityModule = require("utils/utils");

import {TNSTextToSpeech, SpeakOptions} from 'nativescript-texttospeech';


@Component({
  moduleId: module.id,
  selector: 'gf-main-ihm',
  templateUrl: 'main-ihm.html'
})
export class MainIhmComponent implements OnInit{
  public message$: Observable<any>;

  ttsOptions: SpeakOptions;
  constructor(private router: Router, 
              private firebaseService: FirebaseService,
              private routerExtensions:RouterExtensions,
              private tts:TNSTextToSpeech,
              private ngZone: NgZone,
              ) {
                // this.tts = new TNSTextToSpeech();
                this.ttsOptions = {text:"",language:'fr-FR'}
                this.tts.speak(this.ttsOptions);
  }


ngOnInit(){
    this.message$ = <any>this.firebaseService.getMyMessage();
}

followUs(){
      var installed = utilityModule.openUrl("fb://page/303192086777956");
        if (!installed) {
          utilityModule.openUrl("https://facebook.com/EidWa7deh/");
        }
}
goToArchive(){
    this.router.navigate(["/cat-list"]);
  }
  
goToAboutUs(){
    this.router.navigate(["/about-us"]);
  }
gotToConversion(){
    this.router.navigate(["/main-conv"]);
  }

gotToFrench(){
    this.router.navigate(["/phrase-category-list"]);
}

logout() {
    this.firebaseService.logout();
    this.routerExtensions.navigate(["/login"], { clearHistory: true } );
  }

}