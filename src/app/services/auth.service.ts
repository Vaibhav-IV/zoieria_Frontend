import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError } from 'rxjs'

const AUTH_API = 'http://localhost:3000/api/auth/';
const updateURL = 'http://localhost:3000/api/auth/updateUser'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(first_name: string, last_name: string, username: string, gender: string, contact_number: string, address: string, email_id: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        first_name,
        last_name,
        username,
        gender,
        contact_number,
        address,
        email_id,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${updateURL}/${id}`, data)
    .pipe(
      tap((_) => console.log("User Upated"))
    )
  }

}