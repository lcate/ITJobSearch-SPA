import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JobApplication } from '../_Models/JobApplication';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobApplicationService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    public getJobApplicationsForUser(userEmail: string) {
      return this.http.get(this.baseUrl + 'jobapplication/' + userEmail);
    }

    public getJobApplicationById(id: number) {
      return this.http.get(this.baseUrl + 'jobapplication/byid/' + id);
    }

    public getJobApplications(): Observable<JobApplication[]> {
      return this.http.get<JobApplication[]>(this.baseUrl + 'jobapplication');
    }

    public getJobApplicationsByJobOfferId(jobOfferId: number) {
      return this.http.get(this.baseUrl + 'jobapplication/joboffer/' + jobOfferId);
  }

    public addJobApplication(userEmail: string, jobOfferId: number, imgPath: string) {
      const body = {
        UserEmail: userEmail,
        JobOfferId: jobOfferId,
        ImgPath: imgPath
      };
      return this.http.post(this.baseUrl + 'jobapplication', body);
    }

    public updateStatusForJobApplication(newStatus: number, jobApplicationId: number) {
      const body = {
        NewStatus: newStatus,
        JobApplicationId: jobApplicationId
      };
      return this.http.put(this.baseUrl + 'jobapplication/updatestatus', body);
    }

}
