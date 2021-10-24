import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditProfileDialogComponent } from 'src/app/edit-profile-dialog/edit-profile-dialog.component';
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
  response!: {dbPath: ''};
  userAllFunction: any;

  constructor(private allFunction: AllFunctions, private companyService: CompanyService, private userService: UserService,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.allFunction.isCompany) {
      this.companyID = this.allFunction.companyID;
      this.getCompanyInfo(this.allFunction.companyID);
    } else {
      this.userAllFunction = this.allFunction.user;
      this.getUserInfo(this.userAllFunction.email);
    }
  }

  getUserInfo(email: string) {
    this.userService.getUserByEmail(email).subscribe(user => {
      this.user = user;
    });
  }

  getCompanyInfo(companyId: number) {
    this.companyService.getCompanyById(companyId)
      .subscribe(company => {
        this.company = company;
    });
  }

  public editCompanyProfile() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      isCompany: true,
      user: null,
      company: this.company
    };

    const dialogRef = this.dialog.open(EditProfileDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((data: Company) => {
        const companyData = {
          Id: this.companyID,
          Name: data.user.fullName,
          URL: data.webURL,
          Linkedin: data.user.linkedin,
          AboutUs: data.user.aboutMe,
          ProfilePicture: data.user.profilePicture,
          Address: data.user.address,
          City: data.user.city,
          UserName: data.user.fullName,
          PhoneNumber: data.user.phoneNumber,
          EmployeesFrom: data.employeesFrom,
          EmployeesTo: data.employeesTo,
          YearFounded: data.yearFounded,
          Locations: data.locations
        };

        this.companyService.updateCompany(this.company.id, companyData)
          .subscribe((companyData: any) => {
            localStorage.setItem(Constants.USER_KEY, JSON.stringify(companyData));
            this.getCompanyInfo(this.company.id);
          },
          err => {

          });
      });
  }

  public editUserProfile() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      isCompany: false,
      company: null,
      user: this.user
    };

    const dialogRef = this.dialog.open(EditProfileDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((data) => {
        this.user.aboutMe = data.aboutMe;
        this.user.address = data.address;
        this.user.city = data.city;
        this.user.dateOfBirth = data.dateOfBirth;
        this.user.userName = data.userName;
        this.user.fullName = data.fullName;
        this.user.linkedin = data.linkedin;
        this.user.phoneNumber = data.phoneNumber;
        this.user.profilePicture = data.profilePicture;

        this.userService.updateUserProfile(this.userAllFunction.email, this.user)
          .subscribe((userData) => {
          // succ
          localStorage.setItem(Constants.USER_KEY, JSON.stringify(userData));
          this.getUserInfo(this.userAllFunction.email);
        }, () => {
          // errr
        });
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
