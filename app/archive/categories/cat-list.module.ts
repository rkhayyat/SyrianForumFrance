import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { catListRouting } from "./cat-list.routes";
import { CatListComponent } from "./cat-list.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    catListRouting
  ],
  declarations: [    
    CatListComponent
  ]
})
export class CatListModule {}