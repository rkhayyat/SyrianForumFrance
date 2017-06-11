import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PrimeActiviteComponent } from "./prime-activite.component";
import { AuthGuard } from "../../auth-guard.service";

const primeActiviteRoutes: Routes = [
  { path: "prime-activite", component: PrimeActiviteComponent, canActivate: [AuthGuard] },
];
export const primeActiviteRouting: ModuleWithProviders = RouterModule.forChild(primeActiviteRoutes);