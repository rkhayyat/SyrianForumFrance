import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BruteNetComponent } from "./brute-net.component";
import { AuthGuard } from "../../auth-guard.service";

const bruteNetRoutes: Routes = [
  { path: "brute-net", component: BruteNetComponent, canActivate: [AuthGuard] },
];
export const bruteNetRouting: ModuleWithProviders = RouterModule.forChild(bruteNetRoutes);