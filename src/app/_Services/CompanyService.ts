import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../_Models/Company';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompanyMapper } from './Mappers/CompanyMapper';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line: typedef
    public addCompany(company: Company) {
        return this.http.post(this.baseUrl + 'companies', company);
    }

    // tslint:disable-next-line: typedef
    public updateCompany(id: number, company: Company) {
        return this.http.put(this.baseUrl + 'companies/' + id, company);
    }

    public getCompanies(): Observable<Company[]> {
      return new Observable((observer) => {
        this.http.get<Company[]>(this.baseUrl + `companies`).subscribe(
          (_succ) => observer.next(CompanyMapper.toCompanyViewModel(_succ)),
          (_error) => observer.error(_error)
        );
      });
    }

    // tslint:disable-next-line: typedef
    public deleteCompany(id: number) {
        return this.http.delete(this.baseUrl + 'companies/' + id);
    }

    public getCompanyById(id: number): Observable<Company> {
        return this.http.get<Company>(this.baseUrl + 'companies/' + id);
    }
}
