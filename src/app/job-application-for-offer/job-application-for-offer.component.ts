import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobApplicationService } from '../_Services/JobApplicationService';

@Component({
  selector: 'app-job-application-for-offer',
  templateUrl: './job-application-for-offer.component.html',
  styleUrls: ['./job-application-for-offer.component.css']
})
export class JobApplicationForOfferComponent implements OnInit {

  jobOfferId!: number;
  jobApplications!: any;

  constructor(private route: ActivatedRoute, private jobApplicationsService: JobApplicationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobOfferId = params.id;
    });
    this.getJobApplicationsByJobOfferId(this.jobOfferId);
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
