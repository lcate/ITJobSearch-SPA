import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../Helpers/constants';
import { ResponseModel } from '../_Models/ResponseModel';
import { Role } from '../_Models/Role';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public roles: Role[] = [];
  role = 'User';
  isCompanyUser = false;
  public registerForm!: FormGroup;

  // public registerForm = this.formBuilder.group({
  //   fullName: ['', Validators.required],
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', Validators.required],
  //   webURL: ['', Validators.required],
  //   logo: ['', Validators.required]
  // });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('',  [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      webURL: new FormControl(''),
      logo: new FormControl(''),
      linkedin: new FormControl(''),
      aboutUs: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // this.getAllRoles();
  }

  public onSubmit() {
    const fullName = this.registerForm.controls.fullName.value;
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;
    const webURL = this.registerForm.controls.webURL.value;
    const logo = this.registerForm.controls.logo.value;
    const linkedin = this.registerForm.controls.linkedin.value;
    const aboutUs = this.registerForm.controls.aboutUs.value;

    // let roleName;
    // this.roles.forEach(x => {
    //   if (x.isSelected) {
    //     roleName = x.role;
    //   }
    // });
    this.userService.register(fullName, email, password, this.role, webURL, logo, linkedin, aboutUs).subscribe((data: any) => {
      if (data.responseCode === 1) {
        localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dataSet));
        this.router.navigate(['/companies']);
      }
    },
    (error) => {
      console.log('error', error);
    });
  }

  // getAllRoles() {
  //   this.userService.getAllRole().subscribe(roles => {
  //     this.roles = roles;
  //   });
  // }

  // onRoleChange(role: string) {
  //     this.roles.forEach(x => {
  //     if (x.role === role) {
  //       x.isSelected = !x.isSelected;
  //     }
  //   });
  // }

  isUser(): void {
    this.isCompanyUser = false;
    this.role = 'User';
  }

  isCompany(): void {
    this.isCompanyUser = true;
    this.role = 'Company';
  }
}
