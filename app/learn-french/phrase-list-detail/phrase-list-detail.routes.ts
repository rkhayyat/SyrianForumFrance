import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PhraseListDetailComponent } from "./phrase-list-detail.component";

const phraseListDetailRoutes: Routes = [
    { path: "phrase-list-detail/:itemFr/:itemAr", component: PhraseListDetailComponent },
];
export const phraseListDetailRouting: ModuleWithProviders = RouterModule.forChild(phraseListDetailRoutes);


