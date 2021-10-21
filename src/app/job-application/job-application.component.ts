import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../_Models/JobApplication';
import { JobApplicationService } from '../_Services/JobApplicationService';
import { AllFunctions } from 'src/app/_Services/allFunctions';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {
  public isCompanyUser!: boolean;
  public companyId!: number;
  public userEmail!: string;

  jobApplications!: any;

  constructor(private jobAppService: JobApplicationService,
              private allFunction: AllFunctions) { }

  ngOnInit(): void {
    this.isCompanyUser = this.allFunction.isCompany;
    this.companyId = this.allFunction.companyID;
    this.userEmail = this.allFunction.user.email;
    this.getJobApplicationsForUser(this.userEmail);
  }

  public getJobApplicationsForUser(userEmail: string) {
    this.jobAppService.getJobApplicationsForUser(userEmail).subscribe(
      (jobApps: any) => {
        this.jobApplications = jobApps;
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
