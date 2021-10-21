import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/Helpers/constants';
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
  companyID!: number;
  company!: Company;
  user!: User;
  public formGroup!: FormGroup;
  isEdit = false;
  response!: {dbPath: ''};
  userAllFunction: any;

  constructor(private allFunction: AllFunctions, private companyService: CompanyService, private userService: UserService) {

   }

  ngOnInit(): void {
    if (this.allFunction.isCompany) {
      this.companyID = this.allFunction.companyID;
      this.formGroup = new FormGroup({
        companyName: new FormControl('', Validators.required),
        webURL: new FormControl('',  Validators.required),
        email: new FormControl({value: '', disabled: true}, Validators.required),
        linkedin: new FormControl('', Validators.required),
        aboutUs: new FormControl('',  Validators.required),
      });
      this.getCompanyInfo(this.allFunction.companyID);
    } else {
      this.formGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl({value: '', disabled: true}, Validators.required)
      });
      this.userAllFunction = this.allFunction.user;
      this.getUserInfo(this.userAllFunction.email);
    }
  }

  getUserInfo(email: string) {
    this.userService.getUserByEmail(email).subscribe(user => {
      this.user = user;
      this.isEdit = false;
    });
  }

  getCompanyInfo(companyId: number) {
    this.companyService.getCompanyById(companyId)
      .subscribe(company => {
        this.company = company;
        this.isEdit = false;
    });
  }

  updateCompanyProfile() {
    const companyData = {
      Id: this.companyID,
      Name: this.formGroup.controls.companyName.value,
      URL: this.formGroup.controls.webURL.value,
      Linkedin: this.formGroup.controls.linkedin.value,
      AboutUs: this.formGroup.controls.aboutUs.value,
      ProfilePicture: this.response.dbPath
    };
    this.companyService.updateCompany(this.company.id, companyData)
      .subscribe((companyData: any) => {
        localStorage.setItem(Constants.USER_KEY, JSON.stringify(companyData));
        this.getCompanyInfo(this.company.id);
      },
      err => {

      });
  }

  public editCompanyProfile() {
    this.isEdit = true;
    this.formGroup.controls.companyName.setValue(this.company.name);
    this.formGroup.controls.webURL.setValue(this.company.webURL);
    this.formGroup.controls.email.setValue(this.company.user.email);
    this.formGroup.controls.linkedin.setValue(this.company.linkedin);
    this.formGroup.controls.aboutUs.setValue(this.company.aboutUs);
  }

  public editUserProfile() {
    this.isEdit = true;
    this.formGroup.controls.name.setValue(this.user.fullName);
    this.formGroup.controls.email.setValue(this.user.email);
  }

  public updateUserProfile() {
    const userData = {
      Email: this.user.email,
      Name: this.formGroup.controls.name.value,
      ProfilePicture: this.response.dbPath
    };
    this.userService.updateUserProfile(this.userAllFunction.email, userData)
      .subscribe((userData) => {
        localStorage.setItem(Constants.USER_KEY, JSON.stringify(userData));
        this.getUserInfo(this.userAllFunction.email);
      },
      err => {

      });
  }

  public uploadFinished = (event: any) => {
    this.response = event;
  }

  public createImgPath = (serverPath: string) => {
    if (serverPath !== null && serverPath !== '') {
      return `https://localhost:5001/${serverPath}`;
    } else {
      return 'https://loverary.files.wordpress.com/2013/10/facebook-default-no-profile-pic.jpg?w=778';
    }
  }
}
