import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { mainConvRouting } from "./main-conv.routes";
import { MainConvComponent } from "./main-conv.component";


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    mainConvRouting
  ],
  declarations: [    
    MainConvComponent
    
  ]
})
export class MainConvModule {}