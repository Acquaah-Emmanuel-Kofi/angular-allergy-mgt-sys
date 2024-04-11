import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { decodeJwt } from '../../utility/decode-jwt.utility';
import {
  DecodedToken,
  PayloadData,
} from '../../interfaces/decodeJwt.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _http: HttpClient, private _router: Router) {}

  registerUser(formData: Object): Observable<any> {
    return this._http.post<object>(
      `${environment.BACKEND_API_BASE_URL}/auth/register`,
      formData
    );
  }

  loginUser(formData: Object): Observable<any> {
    return this._http.post<object>(
      `${environment.BACKEND_API_BASE_URL}/auth/login`,
      formData
    );
  }

  updateUserDetails(userId: string, formData: Object): Observable<any> {
    return this._http.put<object>(
      `${environment.BACKEND_API_BASE_URL}/user/update-user-details/${userId}`,
      formData
    );
  }

  saveToken(token: string) {
    localStorage.setItem('TOKEN', token);
  }

  getAccessToken() {
    return localStorage.getItem('TOKEN');
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return token ? true : false;
  }

  logoutUser(): void {
    localStorage.removeItem('TOKEN');
    this._router.navigate(['/login']);
  }

  getUserDeatils(): PayloadData | null {
    let accessToken = this.getAccessToken();

    if (accessToken) {
      // Decode the JWT token
      const decodedToken: DecodedToken | null = decodeJwt(accessToken);

      // Access the data from the payload
      if (decodedToken && decodedToken.payload) {
        const payloadData = decodedToken.payload;
        const userId = payloadData.userId;
        const username = payloadData.sub;

        return { userId, username };
      }
    }

    return null;
  }
}
