import { Injectable } from "@angular/core";
import { getString, setString, setBoolean, getBoolean } from "application-settings";

const tokenKey = "token";
const Anonymous = false;

export class BackendService {
  
  static isLoggedIn(): boolean {
    return !!getString("token");
  }

  static get token(): string {
    return getString("token");
  }

  static set token(theToken: string) {
    setString("token", theToken);
  }

static get isAnonymous(): boolean {
    return getBoolean("Anonymous");
  }

  static set isAnonymous(Anonymous: boolean) {
    setBoolean("Anonymous", Anonymous);
  }

}
