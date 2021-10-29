import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../Helpers/constants';
import { AllFunctions } from '../_Services/allFunctions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private allFunction: AllFunctions) {}

  ngOnInit(): void {
  }

  findAJob() {
    this.router.navigate(['/joboffers']);
  }

  registerForOfferingJob() {
    const isCompany= this.allFunction.isCompany;
    const isUserLoggedIn= this.allFunction.isUserLoggedIn;
    if(isCompany && isUserLoggedIn) {
      this.router.navigate(['/joboffers']);
    } else if (isUserLoggedIn) {
      localStorage.removeItem(Constants.USER_KEY);
      localStorage.clear();
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
