import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/_Services/confirmation-dialog.service';
import { CompanyService } from 'src/app/_Services/CompanyService';
import { Company } from 'src/app/_Models/Company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  public companies!: Company[];
  public searchTerm!: string;

  constructor(private router: Router,
              private service: CompanyService,
              private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  private getCompanies() {
    this.service.getCompanies().subscribe(companies => {
      this.companies = companies;
    },
    error => {
    // nesto
    });
  }

  public addCompany() {
    this.router.navigate(['/company']);
  }

  public editCompany(companyId: number) {
    this.router.navigate(['/company/' + companyId]);
  }

  public deleteCompany(companyId: number) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this company?')
      .then(() =>
        this.service.deleteCompany(companyId).subscribe(() => {
          this.getCompanies();
        },
          error => {
          }))
      .catch(() => '');
  }


}
