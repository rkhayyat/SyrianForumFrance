import {Component, OnInit} from '@angular/core';
import {ModalDialogParams} from 'nativescript-angular/directives/dialogs';
import {FirebaseService} from "../../services";


@Component({
  moduleId: module.id,
  selector: "gf-search-modal",
  templateUrl: "search-modal.html"
})


export class SearchModalComponent implements OnInit{
    public categoryList: Array<any>;
    constructor(private firebaseService: FirebaseService,
                private params:ModalDialogParams
    ) {
            this.categoryList=[];
            this.categoryList = this.params.context.categoryList;
            this.categoryList.splice(0, 0, {"title":"جميع الأقسام"})

    }

    ngOnInit(){
       
   
    }

    public close(response){
        this.params.closeCallback(response);
    }
}
