import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = `${BASE_URL}/register`;
  private _loginUrl = `${BASE_URL}/login`;

  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  registerUser(user): Observable<any> {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user): Observable<any> {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
