import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobOffer } from '../_Models/JobOffer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobOffersService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    public addJobOffer(jobOffer: JobOffer) {
        return this.http.post(this.baseUrl + 'joboffers', jobOffer);
    }

    public updateJobOffer(id: number, jobOffer: JobOffer) {
        return this.http.put(this.baseUrl + 'jobOffers/' + id, jobOffer);
    }

    public getJobOffers(): Observable<JobOffer[]> {
        return this.http.get<JobOffer[]>(this.baseUrl + `joboffers`);
    }

    public deleteJobOffer(id: number) {
        return this.http.delete(this.baseUrl + 'joboffers/' + id);
    }

    public getJobOffersForCompany(companyId: number) {
      return this.http.get(this.baseUrl + 'joboffers/company/' + companyId);
    }

    public getJobOfferById(id: number): Observable<JobOffer> {
        return this.http.get<JobOffer>(this.baseUrl + 'joboffers/' + id);
    }

    public jobOfferExists(id: number): Observable<boolean> {
      return this.http.get<boolean>(this.baseUrl + `joboffers/exists/` + id);
    }

    // public searchBooksWithCategory(searchedValue: string): Observable<JobOffer[]> {
    //     return this.http.get<JobOffer[]>(`${this.baseUrl}jobOffers/search-book-with-category/${searchedValue}`);
    // }
}
