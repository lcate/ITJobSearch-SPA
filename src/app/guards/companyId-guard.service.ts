import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../Helpers/constants';
import { JobOffersService } from '../_Services/JobOfferService';

@Injectable()
export class CompanyIdGuard implements CanActivate {

  jobOfferId!: number;

  constructor(private router: Router, public service: JobOffersService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)!);

    this.jobOfferId = route.params.id;

    return this.service.getJobOfferById(this.jobOfferId).pipe(
      map((jobOffer) => {
        if (jobOffer.companyId !== user.companyId) {
          this.router.navigate(['/joboffers']);
          return false;
        } else {
          return true;
        }
      })
    );
  }

}
