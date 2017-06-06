import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { phraseCategoryListRouting } from "./phrase-category-list.routes";
import { PhraseCategoryListComponent } from "./phrase-category-list.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    phraseCategoryListRouting
  ],
  declarations: [
    PhraseCategoryListComponent
  ]
})
export class PhraseCategoryListModule { }