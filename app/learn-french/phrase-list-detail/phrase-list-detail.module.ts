import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { phraseListDetailRouting } from "./phrase-list-detail.routes";
import { PhraseListDetailComponent } from "./phrase-list-detail.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    phraseListDetailRouting
  ],
  declarations: [
    PhraseListDetailComponent
  ]
})
export class PhraseListDetailModule { }
