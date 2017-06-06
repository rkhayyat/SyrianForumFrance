import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { bruteNetRouting } from "./brute-net.routes";
import { BruteNetComponent } from "./brute-net.component";
import { FloatBtnModule } from "../../components/float-btn.module";
import {CurrencyEuroModule} from "../../pipes";
// import { CurrencyEuroPipe } from "../../pipes";


@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    bruteNetRouting,
    FloatBtnModule,
    CurrencyEuroModule
  ],
  declarations: [    
    BruteNetComponent,
    // CurrencyEuroPipe,
    
    
  ]
})
export class BruteNetModule {}