import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyService } from './_Services/CompanyService';
import { JobOffersService } from './_Services/JobOfferService';
import { ConfirmationDialogService } from './_Services/confirmation-dialog.service';
import { CompanyComponent } from './Companies/company/company.component';
import { CompanyListComponent } from './Companies/company-list/company-list.component';
import { JobOfferComponent } from './JobOffers/job-offer/job-offer.component';
import { JobOfferListComponent } from './JobOffers/job-offer-list/job-offer-list.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DatepickerPopupComponent } from './datepicker/datepicker-popup';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyListComponent,
    JobOfferComponent,
    JobOfferListComponent,
    HomeComponent,
    NavComponent,
    ConfirmationDialogComponent,
    DatepickerPopupComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    CompanyService,
    JobOffersService,
    ConfirmationDialogService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
