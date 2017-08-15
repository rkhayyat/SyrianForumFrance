import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import {Location} from "@angular/common";
import {Observable} from 'rxjs/Observable';
import { CardService } from '../../services';
import { Cards } from '../../models';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import {TNSTextToSpeech, SpeakOptions} from 'nativescript-texttospeech';
import {SpeechRecognition, SpeechRecognitionTranscription,SpeechRecognitionOptions} from 'nativescript-speech-recognition';
import {Router, ActivatedRoute} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';
import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("SwipeCard", () => require("nativescript-swipe-card").SwipeCard);
import {SwipeEvent} from 'nativescript-swipe-card';
import {Layout} from "tns-core-modules/ui/layouts/layout";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {GridLayout, ItemSpec} from "tns-core-modules/ui/layouts/grid-layout";
import {Label} from "tns-core-modules/ui/label";
import {Image} from "tns-core-modules/ui/image";
import {Button} from "tns-core-modules/ui/button";

@Component({
    moduleId: module.id,
    templateUrl: "phrase-cards.html"
})
export class PhraseCardsComponent implements OnInit {

    constructor(
        private cardService: CardService,
        public fonticon: TNSFontIconService,
        private location: Location,
        private ngZone:NgZone,
        private tts:TNSTextToSpeech,
        private speech:SpeechRecognition,
        private route:ActivatedRoute,
        private routerExtensions:RouterExtensions
    ) {
        this.isCorrect=false;
        this.textSpeech="";
        this.speechOptions = {
                    locale: 'fr-FR',
                    onResult: (transcription: SpeechRecognitionTranscription)=> {
                        this.ngZone.run(() => {
                                    let swiperight = <Button>this.swiperight.nativeElement;
                                    swiperight.className =  'btnFr fa font-awesome';
                                    console.log(`${transcription.text}`);
                                    this.textSpeech = transcription.text;
                                    console.log(`${transcription.finished}`);
                                    this.toggleWrite = false;
                                    let compareString:string = this.cards[this.cardIndex-1].FRANÇAIS.replace("?", "");
                                    if (transcription.text.toUpperCase()=== compareString.trim().toUpperCase()) {
                                        this.textSpeech = this.textSpeech + "   أحسنت";
                                        this.isCorrect=true;
                                    } else {
                                        this.textSpeech = this.textSpeech + "   حاول من جديد";
                                        this.isCorrect=false;
                                    }
                        });
                    }};
     }
    
    cards: Array<any>=[];
    cardsColor: Array<any>=[];
    FR: string;
    AR: string;
    i: number = 0;
    groupTitle:string;
    frenchMessage:string;
    cardIndex:number;
    ttsOptions: SpeakOptions;
    speechOptions: SpeechRecognitionOptions;   
    isCorrect:boolean;
    toggleWrite:boolean=false;
    public textSpeech:string;
    private sub$: Observable<any>;
    public stackCards:Array<Layout>=[];
    public dumpArray:Array<Layout>=[];
    @ViewChild("swipeleft") swipeleft: ElementRef;
    @ViewChild("swiperight") swiperight: ElementRef;

    ngOnInit() {

         this.sub$ = this.route.params;
         this.cardsColor = this.cardService.getColor();

         this.sub$.switchMap((params: any) => {
                                    this.groupTitle = params['title'];
                              return <any>this.cardService.getPhrase(params['id'])}                              
                            ).subscribe((phrases:Array<any>) => {
                      
                            for (var key in phrases) {
                                this.cards.push(phrases[key]);
                            }

                            this.FR = this.cards[this.i].FRANÇAIS;
                            this.cardIndex = this.cards.length;
                            this.frenchMessage = this.cards[this.i].FRANÇAIS;
                            for (var key in this.cards) {
                                this.handleSwipe(key);
                            }
                            this.stackCards = <Layout[]>this.dumpArray;
                            
                    });	
        
    }

    back(){
      this.location.back();
    }
    goHome(){
        this.routerExtensions.navigate(["/"], { clearHistory: true } );
    }
    handleSwipe(key: any) {
        this.i--;
        let stack = new StackLayout();
        let emoji = new Label();
        let emojiAr = new Label();
        let swipeleft = <Button>this.swipeleft.nativeElement;
        let swiperight = <Button>this.swiperight.nativeElement;

        //set the emoji on the card
        emoji.text = this.cards[key].FRANÇAIS;
        emoji.textWrap=true;
        emojiAr.text = this.cards[key].ARABIC;
        emojiAr.textWrap=true;
        
        //android specific
        emoji.textAlignment = "center";
        emojiAr.textAlignment = "center";

        stack.verticalAlignment = "middle";
        stack.addChild(emojiAr);
        stack.addChild(emoji);
        this.dumpArray.push(stack);

    }


        swipeEvent(args:any) {
            this.cardIndex = args.cardIndex;
        };     
    

    readText(){
        if (this.cardIndex > 0) {
            let swipeleft = <Button>this.swipeleft.nativeElement;
            swipeleft.className = 'btnFrActiveSpeak fa font-awesome';
                let txt:string =  this.cards[this.cardIndex-1].FRANÇAIS;
                this.ttsOptions = {
                    text:txt,
                    language:'fr-FR',
                    finishedCallback: function(){
                        swipeleft.className ='btnFr fa font-awesome';
                    }
                }
            this.tts.speak(this.ttsOptions);
        } 
    }    

    writeText(){
        if (this.cardIndex > 0) {
            this.speech.available().then(result =>{
                    result ? this.startListening() : alert('Speech recognition is not available');
            }, error=>{
                console.error(error);
            })
        }
    }

    startListening(){
        this.speech.startListening(this.speechOptions).then(()=> {
            let swiperight = <Button>this.swiperight.nativeElement;
            swiperight.className ='btnFrActiveListen fa font-awesome';
            console.log("started listening")
        }, error=>{
            console.error(error)});
    }

    stopListening(){
        this.speech.stopListening().then(()=>{
            let swiperight = <Button>this.swiperight.nativeElement;
            swiperight.className ='btnFr fa font-awesome';
            console.log('stop listening');
        }, error=> {
            console.log(error);
        })
    }
}
