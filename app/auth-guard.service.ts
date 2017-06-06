import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { BackendService } from "./services/backend.service";
import {FirebaseService} from './services';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggingIn = true;
  isAuthenticating = false;
  constructor(private router: Router, private firebaseService:FirebaseService, private routerExtensions:RouterExtensions) { }

  canActivate() {
    if (BackendService.isLoggedIn()) {
      return true;
    }
    else {
      //this.guestLogin();

      this.firebaseService.loginAnonymously()
      .then(() => {
        this.isLoggingIn = true;
        // this.isAuthenticating = false;
        // this.routerExtensions.navigate(["/"], { clearHistory: true } );

      })
      .catch((message:any) => {
        this.isLoggingIn = false;
        // this.isAuthenticating = false;
      });  
      // this.router.navigate(["/login"]);
      // return false;
      return this.isLoggingIn;

    }
  }

}

