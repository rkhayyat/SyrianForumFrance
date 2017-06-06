import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutUsComponent } from "./about-us.component";

import { AuthGuard } from "../auth-guard.service";

const aboutUsRoutes: Routes = [
  { path: "about-us", component: AboutUsComponent, canActivate: [AuthGuard] },
];
export const aboutUsRouting: ModuleWithProviders = RouterModule.forChild(aboutUsRoutes);