import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JobApplication } from '../_Models/JobApplication';
import { Observable } from 'rxjs';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    public getAllComments() {
      return this.http.get(this.baseUrl + 'comment');
    }

    public addComment(jobApplicationId: number, userEmail: string, message: string, file: string) {
      const body = {
        JobApplicationId: jobApplicationId,
        UserEmail: userEmail,
        Message: message,
        File: file
      };
      return this.http.post(this.baseUrl + 'comment', body);
    }

    public getComment(userEmail: string) {
      return this.http.get(this.baseUrl + 'comment/' + userEmail);
    }

    public getCommentById(id: number) {
      return this.http.get(this.baseUrl + 'comment/byid/' + id);
    }

    public getCommentsByJobApplicationId(jobApplicationId: number) {
      return this.http.get(this.baseUrl + 'comment/jobapplication/' + jobApplicationId);
  }



}
