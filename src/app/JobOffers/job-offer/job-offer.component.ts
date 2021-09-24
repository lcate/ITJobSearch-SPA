import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JobOffer } from 'src/app/_Models/JobOffer';
import { JobOffersService } from 'src/app/_Services/JobOfferService';
import { Company } from 'src/app/_Models/Company';
import { AllFunctions } from 'src/app/_Services/allFunctions';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {

  public jobOffer: JobOffer = new JobOffer();
  public companies!: Company[];
  public formGroup!: FormGroup;

  isEdit = false;
  companyId!: number;
  user: any;
  id!: number;

  constructor(public service: JobOffersService,
              private router: Router,
              private route: ActivatedRoute,
              private allFunction: AllFunctions) {
                this.formGroup = new FormGroup({
                  position: new FormControl('', Validators.required),
                  description: new FormControl('',  Validators.required),
                  salary: new FormControl(''),
                  workHours: new FormControl('',  Validators.required),
                });
              }

  ngOnInit() {
    this.resetForm();
    this.companyId = this.allFunction.companyID;

    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    if (this.id != null) {
      this.isEdit = true;
      this.service.getJobOfferById(this.id).subscribe(jobOffer => {
        this.jobOffer = jobOffer;
        this.formGroup.controls.position.setValue(this.jobOffer.position);
        this.formGroup.controls.description.setValue(this.jobOffer.description);
        this.formGroup.controls.salary.setValue(this.jobOffer.salary);
        this.formGroup.controls.workHours.setValue(this.jobOffer.workHours);
        this.companyId = jobOffer.companyId;
      }, err => {
        // error
      });
    } else {
      this.isEdit = false;
      this.resetForm();
    }
  }

  public addJobOffer() {
    this.jobOffer.position = this.formGroup.controls.position.value;
    this.jobOffer.description = this.formGroup.controls.description.value;
    this.jobOffer.salary = this.formGroup.controls.salary.value;
    this.jobOffer.workHours = this.formGroup.controls.workHours.value;
    this.jobOffer.companyId = this.companyId;

    this.service.addJobOffer(this.jobOffer).subscribe(() => {
      // succ
      this.resetForm();
      this.router.navigate(['/joboffers']);
    }, () => {
      // errr
    });
  }

  public editJobOffer() {
    this.jobOffer.position = this.formGroup.controls.position.value;
    this.jobOffer.description = this.formGroup.controls.description.value;
    this.jobOffer.salary = this.formGroup.controls.salary.value;
    this.jobOffer.workHours = this.formGroup.controls.workHours.value;
    this.jobOffer.companyId = this.companyId;

    this.service.updateJobOffer(this.id, this.jobOffer).subscribe(() => {
      // succ
      this.resetForm();
      this.router.navigate(['/joboffers']);
    }, () => {
      // errr
    });

  }
  public cancel() {
    this.router.navigate(['/joboffers']);
  }

  private resetForm() {
    this.formGroup.controls.position.setValue('');
    this.formGroup.controls.description.setValue('');
    this.formGroup.controls.salary.setValue('');
    this.formGroup.controls.workHours.setValue('');
  }
}
