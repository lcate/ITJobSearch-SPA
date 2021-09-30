import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobApplicationService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line: typedef
    public addJobApplication(userEmail: string, jobOfferId: number) {
      const body = {
        UserEmail: userEmail,
        JobOfferId: jobOfferId
      };
      return this.http.post(this.baseUrl + 'jobapplications', body);
    }

}
