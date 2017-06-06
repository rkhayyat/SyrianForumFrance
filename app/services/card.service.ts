import { Injectable ,NgZone} from "@angular/core";
import {Cards,PhraseCategory} from "../models";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {UtilsService} from './utils.service';
import 'rxjs/add/operator/share';
@Injectable()
export class CardService {
    constructor(
    private ngZone: NgZone,
    private utils: UtilsService
  ){}

items: BehaviorSubject<Array<PhraseCategory>> = new BehaviorSubject([]);    
private _allItems: Array<PhraseCategory> = [];

    private cardsColor = new Array<any>(
        { color: 'b1'},
        { color: 'b2'},
        { color: 'b3'},
        { color: 'b4'},
        { color: 'b5'},
        { color: 'b6'},
        { color: 'b7'},
        { color: 'b8'},
        { color: 'b9'},
        { color: 'b10'},
        { color: 'b11'},
        { color: 'b12'},
        { color: 'b13'},
        { color: 'b14'},
        { color: 'b15'},
        { color: 'b16'},
        { color: 'b17'},
        { color: 'b18'},
        { color: 'b19'},
        { color: 'b20'},
        { color: 'b21'},
    );
    getColor() {
        return this.cardsColor;
    }


getPhrase(id:string): Observable<any> {
    return new Observable((observer: any) => {
      let path = "Phrases";
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot2(snapshot.value, id);
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

getPhraseList(): Observable<any> {
    return new Observable((observer: any) => {
      let path = "phrasesCategories";
      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value);
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

handleSnapshot(data: any) {
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {

      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        
        this._allItems.push(result);
      }
      this.publishUpdates1();
    }
    return this._allItems;
  }

  handleSnapshot2(data: any, catId:string) {
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
          if (catId) {
            if(result.categoryId === catId){
               this._allItems.push(result);
            }    

          } else {
            this._allItems.push(result);
          }
      }
      this.publishUpdates();
    }
    return this._allItems;
  }

publishUpdates() {
    // here, we sort must emit a *new* value (immutability!)
    this._allItems.sort(function(a, b){
        if(a.date < b.date) return -1;
        if(a.date > b.date) return 1;
      return 0;
    })
    this.items.next([...this._allItems]);
  }

  publishUpdates1() {
    // here, we sort must emit a *new* value (immutability!)
    this._allItems.sort(function(a, b){
        if(parseInt(a.orderNumber) < parseInt(b.orderNumber)) return -1;
        if(parseInt(a.orderNumber) > parseInt(b.orderNumber)) return 1;
      return 0;
    })
    this.items.next([...this._allItems]);
  }


}