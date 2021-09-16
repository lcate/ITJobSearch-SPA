import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
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
  public registerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.registerForm.controls.fullName.setValue('');
    this.registerForm.controls.email.setValue('');
    this.registerForm.controls.password.setValue('');
    this.roles.forEach(x => x.isSelected = false);
  }

  public onSubmit() {
    const fullName = this.registerForm.controls.fullName.value;
    const email = this.registerForm.controls.email.value;
    const password = this.registerForm.controls.password.value;
    let roleName;
    this.roles.forEach(x => {
      if (x.isSelected) {
        roleName = x.role;
      }
    });
    this.userService.register(fullName, email, password, roleName).subscribe((data: any) => {
      if (data.responseCode === 1) {
        // this.registerForm.controls.fullName.setValue('');
        // this.registerForm.controls.email.setValue('');
        // this.registerForm.controls.password.setValue('');
        // this.roles.forEach(x => x.isSelected = false);

        localStorage.setItem(Constants.USER_KEY, JSON.stringify(data.dataSet));
        this.router.navigate(['/companies']);
      }
    },
    (error) => {
      console.log('error', error);
    });
  }

  getAllRoles() {
    this.userService.getAllRole().subscribe(roles => {
      this.roles = roles;
    });
  }

  onRoleChange(role: string) {
      this.roles.forEach(x => {
      if (x.role === role) {
        x.isSelected = !x.isSelected;
      }
    });
  }
}
