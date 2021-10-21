import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobOffersService } from 'src/app/_Services/JobOfferService';
import { ConfirmationDialogService } from 'src/app/_Services/confirmation-dialog.service';
import { Subject } from 'rxjs';
import { AllFunctions } from 'src/app/_Services/allFunctions';
import { JobApplicationService } from 'src/app/_Services/JobApplicationService';
import { JobOffer } from 'src/app/_Models/JobOffer';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditJobOfferDialogComponent } from 'src/app/add-edit-job-offer-dialog/add-edit-job-offer-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-job-offer-list',
  templateUrl: './job-offer-list.component.html',
  styleUrls: ['./job-offer-list.component.css']
})
export class JobOfferListComponent implements OnInit {
  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;

  // MatPaginator Output
  pageEvent!: PageEvent;

  public jobOffers: JobOffer[] = [];
  public filteredJobOffers: JobOffer[] = [];
  public jobOffer: JobOffer = new JobOffer();
  experience = 'Any';
  position = 'Any';
  workHours = 'Any';
  workType = 'Any';
  salary = 0;

  public isCompanyUser!: boolean;
  public companyId!: number;
  public userEmail!: string;
  public isApplied!: boolean;
  public response!: {dbPath: ''};
  checked = false;

  constructor(private router: Router,
              private service: JobOffersService,
              private allFunction: AllFunctions,
              private jobApplicationService: JobApplicationService,
              private confirmationDialogService: ConfirmationDialogService,
              private dialog: MatDialog) {
               }

  ngOnInit() {
    this.getJobOffers();
    this.isCompanyUser = this.allFunction.isCompany;
    this.companyId = this.allFunction.companyID;
    this.userEmail = this.allFunction.user.email;
  }

  private getJobOffers() {
    this.service.getJobOffers().subscribe(jobOffers => {
      this.jobOffers = jobOffers;
      this.filteredJobOffers = jobOffers;
      this.length = jobOffers.length;
      this.selectionChange();
    });
  }

  addJobOffer() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      isEdit: false,
      jobOffer: null
    };

    const dialogRef = this.dialog.open(AddEditJobOfferDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((data) => {
        this.jobOffer.experience = data.experience;
        this.jobOffer.position = data.position;
        this.jobOffer.workHours = data.workHours;
        this.jobOffer.workType = data.workType;
        this.jobOffer.description = data.description;
        this.jobOffer.salary = data.salary;
        this.jobOffer.companyId = this.companyId;

        this.service.addJobOffer(this.jobOffer).subscribe(() => {
          // succ
          this.getJobOffers();
        }, () => {
          // errr
        });
      });
    }

  public editJobOffer(jobOfferId: number) {
    this.service.getJobOfferById(jobOfferId).subscribe(jobOffer => {
      this.jobOffer = jobOffer;
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
        isEdit: true,
        jobOffer: this.jobOffer
      };

      const dialogRef = this.dialog.open(AddEditJobOfferDialogComponent, dialogConfig);

      dialogRef.afterClosed()
        .subscribe((data) => {
          this.jobOffer.experience = data.experience;
          this.jobOffer.position = data.position;
          this.jobOffer.workHours = data.workHours;
          this.jobOffer.workType = data.workType;
          this.jobOffer.description = data.description;
          this.jobOffer.salary = data.salary;
          this.jobOffer.companyId = this.companyId;

          this.service.updateJobOffer(jobOfferId, this.jobOffer).subscribe(() => {
            // succ
            this.getJobOffers();
          }, () => {
            // errr
          });
        });
      }, err => {
        // error
      });
  }

  public deleteJobOffer(jobOfferId: number) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this Job Offer?')
      .then(() =>
        this.service.deleteJobOffer(jobOfferId).subscribe(() => {
          // succ
          this.getJobOffers();
        },
          err => {
            // error
          }))
      .catch(() => '');
  }

  public apply(jobOfferId: number){
    this.jobApplicationService.addJobApplication(this.userEmail, jobOfferId, this.response.dbPath)
      .subscribe( x => {
        if (x) {
          this.isApplied = true;
        }
      },
      error => {
        this.isApplied = false;
      });
  }


  public getJobOffersForCompany(companyId: number) {
    this.service.getJobOffersForCompany(companyId).subscribe(
      (jobOffers: any) => {
        this.jobOffers = jobOffers;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectionChange() {
    this.filteredJobOffers = this.jobOffers.filter(j => (j.experience === this.experience || this.experience === 'Any')
                                          && (j.position === this.position || this.position === 'Any')
                                          && (j.workHours === this.workHours || this.workHours === 'Any')
                                          && (j.workType === this.workType || this.workType === 'Any')
                                          && j.salary >= this.salary);
    this.length = this.filteredJobOffers.length;
    this.filteredJobOffers = this.filteredJobOffers.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1));
  }

  salaryChange(event: number | null) {
    this.salary = event!;
    this.selectionChange();
  }

  public uploadFinished = (event: any) => {
    this.response = event;
  }

  changed(){
    if (this.checked) {
      this.getJobOffersForCompany(this.companyId);
    } else {
      this.getJobOffers();
    }
  }

  formatLabel(value: number) {
    return value;
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath !== null && serverPath !== '') {
      return `https://localhost:5001/${serverPath}`;
    } else {
      return 'https://loverary.files.wordpress.com/2013/10/facebook-default-no-profile-pic.jpg?w=778';
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  public getServerData(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.selectionChange();
    return event;
  }
}
