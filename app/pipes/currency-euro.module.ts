import { NgModule } from "@angular/core";
import { CurrencyEuroPipe } from "./currency-euro.pipe";

@NgModule({
  declarations: [CurrencyEuroPipe],
  exports:[CurrencyEuroPipe]
})
export class CurrencyEuroModule {}