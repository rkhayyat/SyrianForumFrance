import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { primeActiviteRouting } from "./prime-activite.routes";
import { PrimeActiviteComponent } from "./prime-activite.component";
import {CurrencyEuroModule} from "../../pipes";
import { FloatBtnModule } from "../../components/float-btn.module";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    primeActiviteRouting,
    FloatBtnModule,
    CurrencyEuroModule
  ],
  declarations: [    
    PrimeActiviteComponent,
  ]
})
export class PrimeActiviteModule {}