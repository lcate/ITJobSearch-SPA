import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }

//   isUserAuthenticated() {
//     const token: string | null = localStorage.getItem('jwt');
//     if (token && !this.jwtHelper.isTokenExpired(token)) {
//       console.log(this.jwtHelper.decodeToken(token));
//       return true;
//     }
//     else {
//       return false;
//     }
//   }


//   logOut() {
//     localStorage.removeItem('jwt');
//  }

}
