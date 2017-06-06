import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import {Location} from "@angular/common";
import {Observable} from 'rxjs/Observable';
import { SwipeGestureEventData, GesturesObserver, GestureTypes } from "ui/gestures";
import { GridLayout } from "ui/layouts/grid-layout";
import { StackLayout } from "ui/layouts/stack-layout";
import { AbsoluteLayout } from "ui/layouts/absolute-layout";
import { Label } from "ui/label";
import { Button } from "ui/button";
import { CardService } from '../../services';
import { Cards } from '../../models';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import {TNSTextToSpeech, SpeakOptions} from 'nativescript-texttospeech';
import {SpeechRecognition, SpeechRecognitionTranscription,SpeechRecognitionOptions} from 'nativescript-speech-recognition';
import {Router, ActivatedRoute} from '@angular/router';
import {RouterExtensions} from 'nativescript-angular/router/router-extensions';

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
    // cards: Cards[];
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
    @ViewChild("absolutelayout") al: ElementRef;
    @ViewChild("swipeleft") swipeleft: ElementRef;
    @ViewChild("swiperight") swiperight: ElementRef;
    
    // @ViewChild("yes") yes: ElementRef;
    // @ViewChild("no") no: ElementRef;

    ngOnInit() {
         this.sub$ = this.route.params;
         this.cardsColor = this.cardService.getColor();
         this.sub$.switchMap((params: any) => {
                                    this.groupTitle = params['title'];
                              return <any>this.cardService.getPhrase(params['id'])}                              
                            ).subscribe((phrases:Array<any>) => {
                            //this.cards.push(cards);                       
                            for (var key in phrases) {
                                this.cards.push(phrases[key]);
                            }

                            this.FR = this.cards[this.i].FRANÇAIS;
                            this.cardIndex = this.cards.length;
                            this.frenchMessage = this.cards[this.i].FRANÇAIS;
                            for (var key in this.cards) {
                                this.handleSwipe(key);
                            }
                    });	
        // this.emoji = this.cardService.getEmoji();
        
        //initial card
        
    }

    back(){
      this.location.back();
    }
    goHome(){
        this.routerExtensions.navigate(["/"], { clearHistory: true } );
    }
    handleSwipe(key: any) {
        this.i--;
        let grid = new GridLayout();
        let stack = new StackLayout();
        let emoji = new Label();
        let emojiAr = new Label();
        // let yes = <Label>this.yes.nativeElement;
        // let no = <Label>this.no.nativeElement;
        let absolutelayout = <AbsoluteLayout>this.al.nativeElement;
        let swipeleft = <Button>this.swipeleft.nativeElement;
        let swiperight = <Button>this.swiperight.nativeElement;

        //set the emoji on the card
        emoji.text = this.cards[key].FRANÇAIS;
        emoji.textWrap=true;
        emojiAr.text = this.cards[key].ARABIC;
        emojiAr.textWrap=true;
        
        //android specific
        emoji.textAlignment = "center";

        //build the grid which is the card
        // stack.cssClass = 'cardFr ' + this.cards[key].color;
        // stack.cssClass = 'cardFr ' + this.cardsColor[key].color;
        stack.className = 'cardFr ' + this.cards[key].color;
        stack.className = 'cardFr ' + this.cardsColor[key].color;

        stack.id = 'card' + Number(key);
        stack.marginTop = this.i;
        
        
        //add the emoji to the grid, and the grid to the absolutelayout
        stack.addChild(emojiAr);
        stack.addChild(emoji);
        absolutelayout.addChild(stack);

        //make card swipable
        stack.on(GestureTypes.swipe,  (args: SwipeGestureEventData)=> {
           this.cardIndex = Number(key);
           this.ngZone.run(() => {
                this.textSpeech = "";
           });
            if (args.direction == 1) {
                //right
                // yes.animate({ opacity: 0, duration: 100 })
                //     .then(() => yes.animate({ opacity: 1, duration: 100 }))
                //     .then(() => yes.animate({ opacity: 0, duration: 100 }))
                //     .then(() =>
                        stack.animate({ translate: { x: 1000, y: 100 } })
                            .then(function () { return stack.animate({ translate: { x: 0, y: -2000 } }); })
                            .catch(function (e) {
                                console.log(e.message);
                            })
                    // )
                    // .catch((e) => {
                    //     console.log(e.message);
                    // });
            }
            else {
            //     //left
            //     no.animate({ opacity: 0, duration: 100 })
            //         .then(() => no.animate({ opacity: 1, duration: 100 }))
            //         .then(() => no.animate({ opacity: 0, duration: 100 }))
            //         .then(() =>
                        stack.animate({ translate: { x: -1000, y: 100 } })
                            .then(function () { return stack.animate({ translate: { x: 0, y: -2000 } }); })
                            .catch(function (e) {
                                console.log(e.message);
                            })
                    // )
                    // .catch((e) => {
                    //     console.log(e.message);
                    // });
            }
        });
    }

    readText(){
        if (this.cardIndex > 0) {
            let swipeleft = <Button>this.swipeleft.nativeElement;
            // swipeleft.cssClass= 'btnFrActiveSpeak fa font-awesome';
            swipeleft.className = 'btnFrActiveSpeak fa font-awesome';
                let txt:string =  this.cards[this.cardIndex-1].FRANÇAIS;
                this.ttsOptions = {
                    text:txt,
                    language:'fr-FR',
                    finishedCallback: function(){
                        // swipeleft.cssClass= 'btnFr fa font-awesome';
                        swipeleft.className ='btnFr fa font-awesome';
                    }
                }
            this.tts.speak(this.ttsOptions);
        } 
    }    

    writeText(){
        // this.toggleWrite !=this.toggleWrite;
        if (this.cardIndex > 0) {
            this.speech.available().then(result =>{
                // if (this.toggleWrite) {
                    result ? this.startListening() : alert('Speech recognition is not available');
                // } else {
                //     result ? this.stopListening() : alert('Speech recognition is not available');
                // }
            }, error=>{
                console.error(error);
            })
        }
    }

    startListening(){
        this.speech.startListening(this.speechOptions).then(()=> {
            let swiperight = <Button>this.swiperight.nativeElement;
            // swiperight.cssClass= 'btnFrActiveListen fa font-awesome';
            swiperight.className ='btnFrActiveListen fa font-awesome';
            console.log("started listening")
        }, error=>{
            console.error(error)});
    }

    stopListening(){
        this.speech.stopListening().then(()=>{
            let swiperight = <Button>this.swiperight.nativeElement;
            // swiperight.cssClass = 'btnFr fa font-awesome';
            swiperight.className ='btnFr fa font-awesome';
            console.log('stop listening');
        }, error=> {
            console.log(error);
        })
    }
}
