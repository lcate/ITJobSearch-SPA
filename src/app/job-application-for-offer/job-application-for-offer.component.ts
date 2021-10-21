import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  jobApplications!: any;
  jobOffer!: any;
  isCompanyUser!: boolean;
  companyID!: number;

  constructor(private route: ActivatedRoute, private jobApplicationsService: JobApplicationService,
              private jobOfferService: JobOffersService, private allFunction: AllFunctions) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobOfferId = params.id;
    });
    this.isCompanyUser = this.allFunction.isCompany;
    this.companyID = this.allFunction.companyID;
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
        (jobApplicatons) => {
          this.jobApplications = jobApplicatons;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public createImgPath = (serverPath: string) => {
    return `https://localhost:5001/${serverPath}`;
  }
}
