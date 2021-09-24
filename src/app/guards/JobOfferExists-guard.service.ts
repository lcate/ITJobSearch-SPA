import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../Helpers/constants';
import { JobOffersService } from '../_Services/JobOfferService';

@Injectable()
export class JobOfferExistsGuard implements CanActivate {

  jobOfferId!: number;

  constructor(private router: Router, public service: JobOffersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)!);

    this.jobOfferId = route.params.id;

    return this.service.jobOfferExists(this.jobOfferId).pipe(
      map((jobOffer) => {
        if (!jobOffer) {
          this.router.navigate(['/joboffers']);
          return false;
        } else {
          return true;
        }
      })
    );
  }

}
