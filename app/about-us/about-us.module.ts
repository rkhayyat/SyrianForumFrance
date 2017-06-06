import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { aboutUsRouting } from "./about-us.routes";
import { AboutUsComponent } from "./about-us.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    aboutUsRouting
  ],
  declarations: [
    AboutUsComponent
  ]
})
export class AboutUsModule { }
