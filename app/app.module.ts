import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { authProviders, appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";
import { BackendService, FirebaseService, UtilsService, CafService, CardService, BruteService } from "./services";
// import { CurrencyEuroPipe } from "./pipes";
import { MainIhmModule } from "./main/main-ihm.module";
import { AboutUsModule } from "./about-us/about-us.module";
// import { LoginModule } from "./login/login.module";
import { PhraseCategoryListModule } from "./learn-french/phrase-category-list/phrase-category-list.module";
import { PhraseCardsModule } from "./learn-french/phrase-cards/phrase-cards.module";
import { PhraseListDetailModule } from "./learn-french/phrase-list-detail/phrase-list-detail.module";
import { CatListModule } from "./archive/categories/cat-list.module";
import { MainConvModule } from "./conversion/main-conv/main-conv.module";
import { BruteNetModule } from "./conversion/brute-net/brute-net.module";
import { CafModule } from "./conversion/caf/caf.module";
import { ListModule } from "./archive/list/list.module";
import { ListDetailModule } from "./archive/list-detail/list-detail.module";
import { SearchModalComponent } from "./archive/categories/search-modal.component";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import {TNSTextToSpeech} from 'nativescript-texttospeech';
import {SpeechRecognition} from 'nativescript-speech-recognition';
import {TNSFontIconModule, TNSFontIconService, TNSFontIconPipe, TNSFontIconPurePipe} from 'nativescript-ngx-fonticon';

@NgModule({
  providers: [
    BackendService,
    FirebaseService,
    UtilsService,
    CafService,
    CardService,
    BruteService,
    authProviders,
    ModalDialogService,
    TNSTextToSpeech,
    SpeechRecognition,
  ],
  imports: [
    NativeScriptModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(appRoutes),
    MainIhmModule,
    AboutUsModule,
    // LoginModule,
    // FloatBtnModule,
    ListModule,
    CatListModule,
    ListDetailModule,
    MainConvModule,
    BruteNetModule,
    CafModule,
    PhraseCardsModule,
    PhraseListDetailModule,
    PhraseCategoryListModule,
    TNSFontIconModule.forRoot({
            'fa': 'fonts/font-awesome.css'
        }),
  ],
  declarations: [
      AppComponent,
      SearchModalComponent,
  ],
  entryComponents:[SearchModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }





  
  
  
  