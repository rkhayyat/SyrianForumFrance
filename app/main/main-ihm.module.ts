import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { mainIhmRouting } from "./main-ihm.routes";
import { MainIhmComponent } from "./main-ihm.component";


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    mainIhmRouting
  ],
  declarations: [
    MainIhmComponent,
  ]
})
export class MainIhmModule { }
