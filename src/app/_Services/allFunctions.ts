import { Injectable } from "@angular/core";
import { Constants } from "../Helpers/constants";

@Injectable({
  providedIn: 'root'
})
export class AllFunctions {

  get isUserLoggedIn(): any {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user(): any {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)!);
    return user;
  }

  get userName(): string {
    return this.user.fullName;
  }

  get companyID(): number {
    return this.user.companyId;
  }

  get isCompany(): boolean {
    if (this.isUserLoggedIn && this.user.role === 'Company') {
      return true;
    } else {
      return false;
    }
  }

  get isUser(): boolean {
    if (this.isUserLoggedIn && this.user.role === 'User' && !this.isCompany) {
      return true;
    }
    return false;
  }

}

