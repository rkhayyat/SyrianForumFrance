import {Injectable} from '@angular/core';
import {BruteNet} from "../models";

@Injectable()
export class BruteService {
    public calculate(hourBrute, hourNet, monthBrute, monthNet, yearBrute, yearNet, weekHours, model){
        // let model:BruteNet;
        let coafWeekly = weekHours/35;
        
        if (hourBrute !==0) {

          model.hourNet = parseFloat((hourBrute*0.77).toFixed(2));
          model.monthBrute = parseFloat(((hourBrute)*151.67*coafWeekly).toFixed(2));
          model.monthNet = parseFloat(((hourBrute*0.77)*151.67*coafWeekly).toFixed(2));
          model.yearBrute = parseFloat(((hourBrute)*1820.04*coafWeekly).toFixed(2));
          model.yearNet = parseFloat(((hourBrute*0.77)*1820.04*coafWeekly).toFixed(2));

        } else if (hourNet !==0) {
         
          model.hourBrute = parseFloat((hourNet/0.77).toFixed(2));
          model.monthNet = parseFloat(((hourNet)*151.67*coafWeekly).toFixed(2));
          model.monthBrute = parseFloat(((hourNet/0.77)*151.67*coafWeekly).toFixed(2));
          model.yearNet = parseFloat(((hourNet)*1820.04*coafWeekly).toFixed(2));
          model.yearBrute = parseFloat(((hourNet/0.77)*1820.04*coafWeekly).toFixed(2));

        } else if (monthBrute !==0) {

          model.hourBrute = parseFloat(((monthBrute)/(151.67*coafWeekly)).toFixed(2));
          model.hourNet = parseFloat(((monthBrute*0.77)/(151.67*coafWeekly)).toFixed(2));
          model.monthNet = parseFloat(((monthBrute*0.77)).toFixed(2));
          model.yearBrute = parseFloat(((monthBrute)*12).toFixed(2));
          model.yearNet = parseFloat(((monthBrute*0.77)*12).toFixed(2));


        } else if (monthNet !==0) {

          model.hourBrute = parseFloat(((monthNet/0.77)/(151.67*coafWeekly)).toFixed(2));
          model.hourNet = parseFloat(((monthNet)/(151.67*coafWeekly)).toFixed(2));
          model.monthBrute = parseFloat(((monthNet/0.77)).toFixed(2));
          model.yearBrute = parseFloat(((monthNet/0.77)*12).toFixed(2));
          model.yearNet = parseFloat(((monthNet)*12).toFixed(2));

        } else if (yearBrute !==0) {

          model.hourBrute = parseFloat(((yearBrute)/(1820.04*coafWeekly)).toFixed(2));
          model.hourNet = parseFloat(((yearBrute*0.77)/(1820.04*coafWeekly)).toFixed(2));
          model.monthNet = parseFloat(((yearBrute*0.77)/12).toFixed(2));
          model.monthBrute = parseFloat(((yearBrute)/12).toFixed(2));
          model.yearNet = parseFloat(((yearBrute*0.77)).toFixed(2));

        } else if (yearNet !==0) {

          model.hourBrute = parseFloat(((yearNet/0.77)/(1820.04*coafWeekly)).toFixed(2));
          model.hourNet = parseFloat(((yearNet)/(1820.04*coafWeekly)).toFixed(2));
          model.monthNet = parseFloat(((yearNet)/12).toFixed(2));
          model.monthBrute = parseFloat(((yearNet/0.77)/12).toFixed(2));
          model.yearBrute = parseFloat(((yearNet/0.77)).toFixed(2));

        }      
  }
}
