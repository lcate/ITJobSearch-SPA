import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { JobOffer } from 'src/app/_Models/JobOffer';
import { JobOffersService } from 'src/app/_Services/JobOfferService';
import { CompanyService } from 'src/app/_Services/CompanyService';
import { Company } from 'src/app/_Models/Company';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {

  public jobOffer: JobOffer = new JobOffer();
  public companies!: Company[];

  public formGroup!: FormGroup;

  constructor(public service: JobOffersService,
              private companyService: CompanyService,
              private router: Router,
              private route: ActivatedRoute) {
                this.formGroup = new FormGroup({
                  position: new FormControl('', Validators.required),
                  description: new FormControl('',  Validators.required),
                  salary: new FormControl(''),
                  workHours: new FormControl('',  Validators.required),
                });
              }

  ngOnInit() {
    this.resetForm();
    let id;
    this.route.params.subscribe(params => {
      id = params.id;
    });

    if (id != null) {
      this.service.getJobOfferById(id).subscribe(jobOffer => {
        this.jobOffer = jobOffer;
        this.formGroup.controls.position.setValue(this.jobOffer.position);
        this.formGroup.controls.description.setValue(this.jobOffer.description);
        this.formGroup.controls.salary.setValue(this.jobOffer.salary);
        this.formGroup.controls.workHours.setValue(this.jobOffer.workHours);
      }, err => {
        // error
      });
    } else {
      this.resetForm();
    }

    this.companyService.getCompanies().subscribe(companies => {
      this.companies = companies;
    }, err => {
      // err
    });
  }

  public onSubmit(form: NgForm) {
    form.value.companyId = Number(form.value.companyId);
    if (form.value.id === 0) {
      this.addJobOffer();
    } else {
      this.updateRecord(form);
    }
  }

  public addJobOffer() {
    this.jobOffer.position = this.formGroup.controls.position.value;
    this.jobOffer.description = this.formGroup.controls.description.value;
    this.jobOffer.salary = this.formGroup.controls.salary.value;
    this.jobOffer.workHours = this.formGroup.controls.workHours.value;
    this.jobOffer.companyId = Number(( document.getElementById('companyId') as HTMLSelectElement).value);

    this.service.addJobOffer(this.jobOffer).subscribe(() => {
      // succ
      this.resetForm();
      this.router.navigate(['/joboffers']);
    }, () => {
      // errr
    });
  }

  public updateRecord(form: NgForm) {
    this.service.updateJobOffer(form.form.value.id, form.form.value).subscribe(() => {
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
