import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../Helpers/constants';
import { ResponseModel } from '../_Models/ResponseModel';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    const email = this.loginForm.controls.email.value;
    const password = this.loginForm.controls.password.value;
    this.userService.login(email, password).subscribe((data: any) => {
      if (data.responseCode === 1) {
        localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dataSet));
        if (data.dataSet.role === 'Company') {
          this.router.navigate(['/companies']);
        } else {
          this.router.navigate(['/joboffers']);
        }
      }
    },
    (error) => {
      console.log('Error', error);
    });
  }
}
