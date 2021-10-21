import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  }



}
