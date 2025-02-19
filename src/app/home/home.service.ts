import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private apiUrl = `${environment.API_URL}`;

  constructor(private http: HttpClient) {}

  health(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}
