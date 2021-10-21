import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../Helpers/constants';
import { map } from 'rxjs/operators';
import { Role } from '../_Models/Role';
import { ResponseCode } from '../Enums/ResponseCode';
import { ResponseModel } from '../_Models/ResponseModel';
import { Observable } from 'rxjs';
import { User } from '../_Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL: string = 'http://localhost:5000/api/user/';

  constructor(private httpClient: HttpClient) { }

  public login(email: string, password: string) {
    const body = {
      Email: email,
      Password: password
    };

    return this.httpClient.post(this.baseURL + 'login', body);
  }

  // tslint:disable-next-line: max-line-length
  public register(fullName: string, email: string, password: string, role: string | undefined, webURL: string, logo: string, linkedin: string, aboutUs: string) {
    const body = {
      FullName: fullName,
      Email: email,
      Password: password,
      Role: role,
      WebURL: webURL,
      Logo: logo,
      Linkedin: linkedin,
      AboutUs: aboutUs
    };

    return this.httpClient.post<ResponseModel>(this.baseURL + 'registeruser', body);
  }

  public getAllRole()
   {
     const userInfo = JSON.parse(localStorage.getItem(Constants.USER_KEY)!);
     const headers = new HttpHeaders({
Authorization: `Bearer ${userInfo?.token }`
    });

     return this.httpClient.get<ResponseModel>(this.baseURL + 'getroles', {headers}).pipe(map(res => {
      const roleList = new Array<Role>();
      if (res.responseCode === ResponseCode.OK)
      {
           if (res.dataSet)
           {
           res.dataSet.map((x: string) => {
               roleList.push(new Role(x));
           });
           }
          }
      return roleList;
    }));
   }

   public getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.baseURL + 'getuser/' + email);
   }

   public updateUserProfile(email: string, user: any) {
    return this.httpClient.put(this.baseURL + 'update/' + email, user);
}
}
