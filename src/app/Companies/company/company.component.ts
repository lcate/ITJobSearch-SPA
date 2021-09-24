import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Company } from 'src/app/_Models/Company';
import { CompanyService } from 'src/app/_Services/CompanyService';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  public formData!: Company;

  constructor(public service: CompanyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetForm();

    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    if (id != null) {
      this.service.getCompanyById(id).subscribe(Company => {
        this.formData = Company;
      }, error => {

      });
    } else {
      this.resetForm();
    }
  }

 private resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }
  }

  public onSubmit(form: NgForm) {
    if (form.value.id === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  public insertRecord(form: NgForm) {
    this.service.addCompany(form.form.value).subscribe(() => {
      // succ
      this.resetForm(form);
      this.router.navigate(['/companies']);
    }, () => {
      // error
    });
  }

  public updateRecord(form: NgForm) {
    this.service.updateCompany(form.form.value.id, form.form.value).subscribe(() => {
      //succ
      this.resetForm(form);
      this.router.navigate(['/companies']);
    }, () => {
      //errror
    });
  }

  public cancel() {
    this.router.navigate(['/companies']);
  }

}
