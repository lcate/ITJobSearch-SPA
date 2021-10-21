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
import { JobOfferListComponent } from './JobOffers/job-offer-list/job-offer-list.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DatepickerPopupComponent } from './datepicker/datepicker-popup';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth-guard.service';
import { RoleGuard } from './guards/role-guard.service';
import { CompanyIdGuard } from './guards/companyId-guard.service';
import { JobOfferExistsGuard } from './guards/JobOfferExists-guard.service';
import { ProfileComponent } from './Profile/profile/profile.component';
import { JobApplicationService } from './_Services/JobApplicationService';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobApplicationForOfferComponent } from './job-application-for-offer/job-application-for-offer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './comment/comment.component';
import { CommentService } from './_Services/CommentService';
import { JobApplicationSharedTableComponent } from './job-application-shared-table/job-application-shared-table.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { AddEditJobOfferDialogComponent } from './add-edit-job-offer-dialog/add-edit-job-offer-dialog.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyListComponent,
    JobOfferListComponent,
    HomeComponent,
    NavComponent,
    ConfirmationDialogComponent,
    DatepickerPopupComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UploadComponent,
    DownloadComponent,
    JobApplicationComponent,
    JobApplicationForOfferComponent,
    CommentsComponent,
    JobApplicationSharedTableComponent,
    AddEditJobOfferDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    RouterModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCarouselModule,
    MatTabsModule,
    MatPaginatorModule
  ],
  providers: [
    CompanyService,
    JobOffersService,
    JobApplicationService,
    ConfirmationDialogService,
    AuthGuard,
    RoleGuard,
    CompanyIdGuard,
    JobOfferExistsGuard,
    CommentService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddEditJobOfferDialogComponent]
})
export class AppModule { }
