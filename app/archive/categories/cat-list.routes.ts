import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CatListComponent } from "./cat-list.component";
import { AuthGuard } from "../../auth-guard.service";


const catListRoutes: Routes = [
  { path: "cat-list", component: CatListComponent, canActivate: [AuthGuard] },
];
export const catListRouting: ModuleWithProviders = RouterModule.forChild(catListRoutes);