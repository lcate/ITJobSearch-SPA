import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobOffersService } from 'src/app/_Services/JobOfferService';
import { ConfirmationDialogService } from 'src/app/_Services/confirmation-dialog.service';
import { Subject } from 'rxjs';
import { AllFunctions } from 'src/app/_Services/allFunctions';

@Component({
  selector: 'app-job-offer-list',
  templateUrl: './job-offer-list.component.html',
  styleUrls: ['./job-offer-list.component.css']
})
export class JobOfferListComponent implements OnInit {

  public jobOffers: any;
  public searchTerm!: string;
  public searchValueChanged: Subject<string> = new Subject<string>();

  public isCompanyUser!: boolean;
  public companyId!: number;

  constructor(private router: Router,
              private service: JobOffersService,
              private allFunction: AllFunctions,
              private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.getValues();
    this.isCompanyUser = this.allFunction.isCompany;
    this.companyId = this.allFunction.companyID;
  }

  private getValues() {
    this.service.getJobOffers().subscribe(jobOffers => {
      this.jobOffers = jobOffers;
    });
  }

  public addJobOffer() {
    this.router.navigate(['/joboffer']);
  }

  public editJobOffer(jobOfferId: number) {
    this.router.navigate(['/joboffer/' + jobOfferId]);
  }

  public deleteJobOffer(jobOfferId: number) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this Job Offer?')
      .then(() =>
        this.service.deleteJobOffer(jobOfferId).subscribe(() => {
          // succ
          this.getValues();
        },
          err => {
            // error
          }))
      .catch(() => '');
  }


}
