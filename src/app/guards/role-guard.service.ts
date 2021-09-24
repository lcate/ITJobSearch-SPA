import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Constants } from '../Helpers/constants';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)!);
    if (user.role === 'Company') {
      return true;
    }
    else {
      this.router.navigate(['/joboffers']);
      return false;
    }
  }
}
