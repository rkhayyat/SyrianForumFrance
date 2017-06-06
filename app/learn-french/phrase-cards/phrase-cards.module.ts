import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { phraseCardsRouting } from "./phrase-cards.routes";
import { PhraseCardsComponent } from "./phrase-cards.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    phraseCardsRouting
  ],
  declarations: [    
    PhraseCardsComponent
  ]
})
export class PhraseCardsModule {}



