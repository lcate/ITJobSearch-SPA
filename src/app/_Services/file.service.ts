import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url = 'https://localhost:5001/api/file';

  constructor(private httpClient: HttpClient) { }

  public upload(formData: FormData) {
    return this.httpClient.post(`${this.url}/upload`, formData, {
        reportProgress: true,
        observe: 'events',
    });
  }

  public download(fileUrl: string) {
    return this.httpClient.get(`${this.url}/download?fileUrl=${fileUrl}`, {
        reportProgress: true,
        responseType: 'blob',
    });
  }
}
