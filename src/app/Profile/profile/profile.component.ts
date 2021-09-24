import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/_Models/Company';
import { User } from 'src/app/_Models/User';
import { AllFunctions } from 'src/app/_Services/allFunctions';
import { CompanyService } from 'src/app/_Services/CompanyService';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  company!: Company;
  user!: User;

  constructor(private allFunction: AllFunctions, private companyService: CompanyService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.allFunction.isCompany) {
      this.getCompanyInfo(this.allFunction.companyID);
    } else {
      let user = this.allFunction.user;
      this.getUserInfo(user.email);
    }
  }

  getUserInfo(userID: string) {
    this.userService.getUserByEmail(userID).subscribe(user => {
      this.user = user;
    });
  }

  getCompanyInfo(companyId: number) {
    this.companyService.getCompanyById(companyId)
      .subscribe(company => {
        this.company = company;
    });
  }
}
