import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Constants } from '../Helpers/constants';
import { AllFunctions } from '../_Services/allFunctions';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(private userService: UserService, private router: Router, private allFunction: AllFunctions) {

  }

  ngOnInit(): void {
      this.registerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('',  [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      webURL: new FormControl(''),
      linkedin: new FormControl(''),
      yearFounded: new FormControl(''),
    });
  }

  public onSubmit(role: string) {
    const fullName = this.registerForm.controls.fullName.value;
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;
    const webURL = this.registerForm.controls.webURL.value;
    const linkedin = this.registerForm.controls.linkedin.value;
    const yearFounded = this.registerForm.controls.yearFounded.value == '' ? 0 : this.registerForm.controls.yearFounded.value;

    this.userService.register(fullName, email, password, role, webURL, linkedin, yearFounded).subscribe((data: any) => {
      if (data.responseCode === 1) {
        localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dataSet));
        const user = this.allFunction.user;
        this.router.navigate(['/profile/'+ user.userId]);
      }
    },
    (error) => {
      console.log('error', error);
    });
  }
}
