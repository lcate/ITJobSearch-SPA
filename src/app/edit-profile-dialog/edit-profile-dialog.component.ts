import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../_Models/Company';
import { User } from '../_Models/User';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  isCompany = false;
  dbPath!: any;

  public user: User = new User();
  public company: Company = new Company();

  public editProfileForm!: FormGroup;

  startDate = new Date(1960, 0, 1);

  constructor(private dialogRef: MatDialogRef<EditProfileDialogComponent>, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) data: any) {
                if (data.user !== null) {
                  this.user = data.user;
                  this.dbPath = this.user.profilePicture;
                }
                if (data.company !== null) {
                  this.company = data.company;
                  this.dbPath = this.company.user.profilePicture;
                }
                this.isCompany = data.isCompany;
              }

  ngOnInit(): void {
    if (!this.isCompany) {
      this.editProfileForm = this.formBuilder.group({
        email: {value: this.user.email, disabled: true},
        address: [this.user.address, [Validators.required]],
        city: [this.user.city, [Validators.required]],
        dateOfBirth: [this.user.dateOfBirth],
        fullName: [this.user.fullName, [Validators.required]],
        linkedin: [this.user.linkedin, [Validators.required]],
        phoneNumber: [this.user.phoneNumber, [Validators.required]],
        aboutMe: [this.user.aboutMe]
      });
    } else {
      this.editProfileForm = this.formBuilder.group({
        email: {value: this.company.user.email, disabled: true},
        address: [this.company.user.address, [Validators.required]],
        city: [this.company.user.city, [Validators.required]],
        yearFounded: [this.company.yearFounded, [Validators.required]],
        fullName: [this.company.user.fullName, [Validators.required]],
        linkedin: [this.company.user.linkedin, [Validators.required]],
        phoneNumber: [this.company.user.phoneNumber],
        aboutMe: [this.company.user.aboutMe],
        employeesFrom: [this.company.employeesFrom],
        employeesTo: [this.company.employeesTo],
        locations: [this.company.locations],
        webURL: [this.company.webURL]
      });
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.editProfileForm.controls.dateOfBirth.setValue(event.value);
  }

  public uploadFinished = (event: any) => {
    this.dbPath = event.dbPath;
  }

  editUserProfile() {
      this.user.email = this.editProfileForm.controls.email.value;
      this.user.aboutMe = this.editProfileForm.controls.aboutMe.value;
      this.user.address = this.editProfileForm.controls.address.value;
      this.user.city = this.editProfileForm.controls.city.value;
      this.user.dateOfBirth = this.editProfileForm.controls.dateOfBirth.value;
      this.user.fullName = this.editProfileForm.controls.fullName.value;
      this.user.linkedin = this.editProfileForm.controls.linkedin.value;
      this.user.phoneNumber = this.editProfileForm.controls.phoneNumber.value;
      this.user.userName = this.editProfileForm.controls.fullName.value;
      this.user.profilePicture = this.dbPath;

      this.dialogRef.close(this.user);
  }

  editCompanyProfile() {
    this.company.user.email = this.editProfileForm.controls.email.value;
    this.company.user.aboutMe = this.editProfileForm.controls.aboutMe.value;
    this.company.user.address = this.editProfileForm.controls.address.value;
    this.company.user.city = this.editProfileForm.controls.city.value;
    this.company.user.fullName = this.editProfileForm.controls.fullName.value;
    this.company.user.linkedin = this.editProfileForm.controls.linkedin.value;
    this.company.user.phoneNumber = this.editProfileForm.controls.phoneNumber.value;
    this.company.user.userName = this.editProfileForm.controls.fullName.value;
    this.company.user.profilePicture = this.dbPath;
    this.company.yearFounded = this.editProfileForm.controls.yearFounded.value;
    this.company.locations = this.editProfileForm.controls.locations.value;
    this.company.employeesTo = this.editProfileForm.controls.employeesTo.value;
    this.company.employeesFrom = this.editProfileForm.controls.employeesFrom.value;

    this.dialogRef.close(this.company);
}

  cancel() {
      this.dialogRef.close();
  }
}
