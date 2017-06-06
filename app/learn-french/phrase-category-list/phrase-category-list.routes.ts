import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PhraseCategoryListComponent } from "./phrase-category-list.component";

const phraseCategoryListRoutes: Routes = [
    { path: "phrase-category-list", component: PhraseCategoryListComponent },
];
export const phraseCategoryListRouting: ModuleWithProviders = RouterModule.forChild(phraseCategoryListRoutes);