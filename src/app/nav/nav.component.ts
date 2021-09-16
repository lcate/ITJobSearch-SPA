import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../Helpers/constants';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) {
      if (this.isUserLoggedIn) {
      this.router.navigate(['/joboffers']);
      }
  }

  ngOnInit(): void {
  }

  public onLogout(): void {
    localStorage.removeItem(Constants.USER_KEY);
    localStorage.clear();
  }


  get isUserLoggedIn() {
    const user = localStorage.getItem(Constants.USER_KEY);
    return user && user.length > 0;
  }

  get user() {
    const user = JSON.parse(localStorage.getItem(Constants.USER_KEY)!);
    return user;
  }

  get userName(): string {
    return this.user.fullName;
  }

  get isCompany(): boolean {
    if (this.isUserLoggedIn && this.user.role === 'Company') {
      return true;
    } else {
      return false;
    }
  }

  get isUser(): boolean {
    if (this.isUserLoggedIn && this.user.role === 'User' && !this.isCompany) {
      return true;
    }
    return false;
  }
}
