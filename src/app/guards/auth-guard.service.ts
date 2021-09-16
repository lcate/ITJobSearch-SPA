import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Constants } from '../Helpers/constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(JSON.stringify(localStorage.getItem('userInfo')));
    if (user) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
