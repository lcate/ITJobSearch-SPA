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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth-guard.service';
import { RoleGuard } from './guards/role-guard.service';
import { UserGuard } from './guards/user-guard.service';
import { CompanyIdGuard } from './guards/companyId-guard.service';
import { JobOfferExistsGuard } from './guards/JobOfferExists-guard.service';
import { ProfileComponent } from './Profile/profile/profile.component';
import { JobApplicationService } from './_Services/JobApplicationService';
import { UploadComponent } from './upload/upload.component';
import { DownloadComponent } from './download/download.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobApplicationForOfferComponent } from './job-application-for-offer/job-application-for-offer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommentsComponent } from './comment/comment.component';
import { CommentService } from './_Services/CommentService';
import { AddEditJobOfferDialogComponent } from './add-edit-job-offer-dialog/add-edit-job-offer-dialog.component';
import { EditProfileDialogComponent } from './edit-profile-dialog/edit-profile-dialog.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyListComponent,
    JobOfferListComponent,
    HomeComponent,
    NavComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UploadComponent,
    DownloadComponent,
    JobApplicationComponent,
    JobApplicationForOfferComponent,
    CommentsComponent,
    AddEditJobOfferDialogComponent,
    EditProfileDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EditorModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatCarouselModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatChipsModule,
    MatToolbarModule
  ],
  providers: [
    CompanyService,
    JobOffersService,
    JobApplicationService,
    ConfirmationDialogService,
    AuthGuard,
    RoleGuard,
    UserGuard,
    CompanyIdGuard,
    JobOfferExistsGuard,
    CommentService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddEditJobOfferDialogComponent, EditProfileDialogComponent]
})
export class AppModule { }
