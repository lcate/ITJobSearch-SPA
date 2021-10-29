import { Component, OnInit } from '@angular/core';
import { JobApplication } from '../_Models/JobApplication';
import { JobApplicationService } from '../_Services/JobApplicationService';
import { AllFunctions } from 'src/app/_Services/allFunctions';
import { Router } from '@angular/router';

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

  constructor(private router: Router,
              private jobAppService: JobApplicationService,
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
    if (serverPath !== null && serverPath !== '') {
      return `https://localhost:5001/${serverPath}`;
    } else {
      return 'https://loverary.files.wordpress.com/2013/10/facebook-default-no-profile-pic.jpg?w=778';
    }
  }

  findJob() {
    this.router.navigate(['/joboffers']);
  }
}
