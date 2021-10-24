import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobApplication } from '../_Models/JobApplication';
import { JobOffer } from '../_Models/JobOffer';
import { AllFunctions } from '../_Services/allFunctions';
import { JobApplicationService } from '../_Services/JobApplicationService';
import { JobOffersService } from '../_Services/JobOfferService';

@Component({
  selector: 'app-job-application-for-offer',
  templateUrl: './job-application-for-offer.component.html',
  styleUrls: ['./job-application-for-offer.component.css']
})
export class JobApplicationForOfferComponent implements OnInit {

  jobOfferId!: number;
  jobApplication!: JobApplication;
  jobApplications: JobApplication[] = [];
  jobOffer: JobOffer = new JobOffer();

  isCompanyUser!: boolean;
  isUploaded = false;
  userEmail!: string;
  companyID!: number;
  hasUserApplied = false;
  public response!: {dbPath: ''};

  constructor(private route: ActivatedRoute, private jobApplicationsService: JobApplicationService,
              private jobOfferService: JobOffersService, private allFunction: AllFunctions) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobOfferId = params.id;
    });
    this.isCompanyUser = this.allFunction.isCompany;
    this.companyID = this.allFunction.companyID;
    this.userEmail = this.allFunction.user.email;
    this.getJobOfferById();
    this.getJobApplicationsByJobOfferId(this.jobOfferId);
  }

  getJobOfferById(){
    this.jobOfferService.getJobOfferById(this.jobOfferId)
      .subscribe((jo) => {
        this.jobOffer = jo;
      },
      er => {

      });
  }

  getJobApplicationsByJobOfferId(jobOfferId: number) {
    this.jobApplicationsService.getJobApplicationsByJobOfferId(jobOfferId)
      .subscribe(
        (jobApplicatons: any) => {
          this.jobApplications = jobApplicatons;
          this.ifUserHasApplied();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public uploadFinished = (event: any) => {
    this.response = event;
    this.isUploaded = true;
  }

  public ifUserHasApplied() {
    this.hasUserApplied = this.jobApplications.some((x) => x.user.email === this.userEmail);
    this.jobApplication = this.jobApplications.find((x) => x.user.email === this.userEmail)!;
  }

  public apply(jobOfferId: number) {
    this.jobApplicationsService.addJobApplication(this.userEmail, jobOfferId, this.response.dbPath)
      .subscribe( x => {
        if (x) {
        }
      },
      error => {
      });
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }
}
