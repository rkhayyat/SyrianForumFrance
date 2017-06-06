import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainIhmComponent } from "./main-ihm.component";

import { AuthGuard } from "../auth-guard.service";

const mainIhmRoutes: Routes = [
  { path: "", component: MainIhmComponent, canActivate: [AuthGuard] },
];
export const mainIhmRouting: ModuleWithProviders = RouterModule.forChild(mainIhmRoutes);