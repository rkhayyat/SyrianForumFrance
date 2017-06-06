import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainConvComponent } from "./main-conv.component";
import { AuthGuard } from "../../auth-guard.service";

const mainConvRoutes: Routes = [
  { path: "main-conv", component: MainConvComponent, canActivate: [AuthGuard] },
];
export const mainConvRouting: ModuleWithProviders = RouterModule.forChild(mainConvRoutes);