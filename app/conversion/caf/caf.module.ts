import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { cafRouting } from "./caf.routes";
import { CAFComponent } from "./caf.component";
// import { CurrencyEuroPipe } from "../../pipes";
import {CurrencyEuroModule} from "../../pipes";
import { FloatBtnModule } from "../../components/float-btn.module";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    cafRouting,
    FloatBtnModule,
    CurrencyEuroModule
  ],
  declarations: [    
    CAFComponent,
    // CurrencyEuroPipe,
  ]
})
export class CafModule {}