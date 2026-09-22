import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
  }
}
