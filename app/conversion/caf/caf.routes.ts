import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CAFComponent } from "./caf.component";
import { AuthGuard } from "../../auth-guard.service";

const catListRoutes: Routes = [
  { path: "caf", component: CAFComponent, canActivate: [AuthGuard] },
];
export const cafRouting: ModuleWithProviders = RouterModule.forChild(catListRoutes);