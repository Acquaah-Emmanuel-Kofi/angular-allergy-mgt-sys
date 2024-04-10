import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginResponse } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _http: HttpClient) {}

  registerUser(formData: Object): Observable<any> {
    return this.sendRequest('/auth/register', formData);
  }

  loginUser(formData: Object): Observable<any> {
    return this.sendRequest('/auth/login', formData);
  }

  sendRequest(endpoint: string, formData: Object): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Headers', 'Content-Type');

    return this._http.post<object>(
      `${environment.BASE_URL}${endpoint}`,
      formData,
      { headers }
    );
  }

  saveUsefulDetails(data: LoginResponse){
    localStorage.setItem('USER_ID', data.id);
    localStorage.setItem('USERNAME', data.username);
    localStorage.setItem('TOKEN', data.token);
  }
}
