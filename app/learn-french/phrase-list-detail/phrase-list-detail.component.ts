import {Component, OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/switchMap';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from "@angular/common";
import { BackendService, FirebaseService } from "../../services";
// import  * as SocialShare from "nativescript-social-share";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import {TNSTextToSpeech, SpeakOptions} from 'nativescript-texttospeech';
import {SpeechRecognition, SpeechRecognitionTranscription,SpeechRecognitionOptions} from 'nativescript-speech-recognition';

var imageModule = require("ui/image");
var img;

@Component({
  moduleId: module.id,
  selector: "gf-phrase-list-detail",
  templateUrl: "phrase-list-detail.html"
})
export class PhraseListDetailComponent implements OnInit {
  ttsOptions: SpeakOptions;
  speechOptions: SpeechRecognitionOptions;
  public textSpeech:string;
  public resultSpeech:string;
  public isCorrect:boolean;
  private sub$: Observable<any>;
  
  public itemFr:string;
  public itemAr:string;
  public isAnonymous:boolean;
  
  constructor(
        private location: Location,
        private route: ActivatedRoute,
        private ngZone: NgZone,
        private firebaseService: FirebaseService,
        private routerExtensions: RouterExtensions,
        private speech:SpeechRecognition,
        private tts:TNSTextToSpeech, 
    ) {
       this.textSpeech="";
       this.isCorrect=false;
       this.speechOptions = {
                  locale: 'fr-FR',
                  onResult: (transcription: SpeechRecognitionTranscription)=> {
                    this.ngZone.run(() => {
                                console.log(`${transcription.text}`);
                                this.textSpeech = transcription.text;
                                console.log(`${transcription.finished}`);
                                let compareString:string = this.itemFr.replace("?", "");
                                if (transcription.text.toUpperCase()=== compareString.trim().toUpperCase()) {
                                  this.isCorrect=true;
                                } else {
                                  this.isCorrect=false;
                                }
                      });
                  }};
    }


 ngOnInit() {
  this.isAnonymous= BackendService.isAnonymous;
  this.sub$ = this.route.params;
  this.sub$.subscribe((params:any) => {
                        this.itemFr = params['itemFr'];
                        this.itemAr = params['itemAr'];
                        console.log('this is the french phrase:',this.itemFr);
                }); 
  }

readText(txt){
  this.ttsOptions = {
    text:txt,
    language:'fr-FR'

  }
  this.tts.speak(this.ttsOptions);
}


writeText(){
  this.speech.available().then(result =>{
    result ? this.startListening() : alert('Speech recognition is not available');
  }, error=>{
    console.error(error);
  })

}

startListening(){
  this.speech.startListening(this.speechOptions).then(()=> {
    console.log("started listening")
  }, error=>{
    console.error(error)});
}

stopListening(){
  this.speech.stopListening().then(()=>{
      console.log('stop listening');
  }, error=> {
      console.log(error);
  })
}

back(){
  this.location.back();
}
goHome(){
  this.routerExtensions.navigate(["/"], { clearHistory: true } );
}

}
