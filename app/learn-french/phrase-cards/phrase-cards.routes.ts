import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PhraseCardsComponent } from "./phrase-cards.component";
import { AuthGuard } from "../../auth-guard.service";

const phraseCardsRoutes: Routes = [
  { path: "phrase-cards/:id/:title", component: PhraseCardsComponent, canActivate: [AuthGuard] },
];
export const phraseCardsRouting: ModuleWithProviders = RouterModule.forChild(phraseCardsRoutes);
