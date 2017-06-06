import {PipeTransform, Pipe} from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
    name:'currencyEuro'
})
export class  CurrencyEuroPipe implements PipeTransform {
    transform(value, args): string{
         let pipe = new DecimalPipe('');
         return '€'+pipe.transform(value, "3.2");
    }
}