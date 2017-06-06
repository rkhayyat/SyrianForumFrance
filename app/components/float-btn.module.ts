import { NgModule } from "@angular/core";
import { floatBtnComponent } from "./float-btn.component";

@NgModule({
  declarations: [floatBtnComponent],
  exports:[floatBtnComponent]
})
export class FloatBtnModule {}