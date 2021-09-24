import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './Companies/company-list/company-list.component';
import { CompanyComponent } from './Companies/company/company.component';
import { CompanyIdGuard } from './guards/companyId-guard.service';
import { JobOfferExistsGuard } from './guards/JobOfferExists-guard.service';
import { RoleGuard } from './guards/role-guard.service';
import { HomeComponent } from './home/home.component';
import { JobOfferListComponent } from './JobOffers/job-offer-list/job-offer-list.component';
import { JobOfferComponent } from './JobOffers/job-offer/job-offer.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './Profile/profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'companies', component: CompanyListComponent, canActivate: [RoleGuard] },
  { path: 'profile', component: ProfileComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'company/:id', component: CompanyComponent },
  { path: 'joboffers', component: JobOfferListComponent },
  { path: 'joboffer', component: JobOfferComponent, canActivate: [RoleGuard] },
  { path: 'joboffer/:id', component: JobOfferComponent, canActivate: [JobOfferExistsGuard, CompanyIdGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
