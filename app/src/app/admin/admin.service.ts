import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _adminUrl = `${BASE_URL}/admin`;

  constructor(
    private http: HttpClient
  ) { }

  getInfo(): Observable<any> {
    return this.http.get<any>(this._adminUrl);
  }
}
