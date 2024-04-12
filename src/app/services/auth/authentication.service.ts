import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { decodeJwt } from '../../utility/decode-jwt.utility';
import {
  DecodedToken,
  PayloadData,
} from '../../interfaces/decodeJwt.interface';
import {
  ACCESS_TOKEN_KEY,
  USERID_KEY,
  USERNAME_KEY,
  decryptData,
  encryptData,
} from '../../utility/constants/auth.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _http: HttpClient, private _router: Router) {}

  private userId = signal(this.getUserDeatils()?.userId);

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

  updateUserDetails(formData: Object): Observable<any> {
    return this._http.put<object>(
      `${environment.BACKEND_API_BASE_URL}/user/update-user-details/${this.userId()}`,
      formData
    );
  }

  getUserProfileDetails(): Observable<any> {
    return this._http.get<object>(
      `${environment.BACKEND_API_BASE_URL}/user/${this.userId()}`
    );
  }

  saveToken(token: string) {
    const encryptedToken = encryptData(token);
    localStorage.setItem(ACCESS_TOKEN_KEY, encryptedToken);
    this.saveUserDeatils(encryptedToken);
  }

  getAccessToken(): String | null {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      const decryptedToken = decryptData(token);
      return decryptedToken;
    }

    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return token ? true : false;
  }

  logoutUser(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(USERNAME_KEY);
    this._router.navigate(['/login']);
  }

  getUserDeatils() {
    const userIdFromLocalStorage = localStorage.getItem(USERID_KEY);
    const usernameFromLocalStorage = localStorage.getItem(USERNAME_KEY);

    if (userIdFromLocalStorage !== null && usernameFromLocalStorage !== null) {
      const userId = decryptData(userIdFromLocalStorage);
      const username = decryptData(usernameFromLocalStorage);

      return { userId, username };
    }

    return null;
  }

  saveUserDeatils(accessToken: string): void {
    const decryptedAccessToken = decryptData(accessToken);

    if (decryptedAccessToken) {
      // Decode the JWT token
      const decodedToken: DecodedToken | null = decodeJwt(decryptedAccessToken);

      // Access the data from the payload
      if (decodedToken && decodedToken.payload) {
        const payloadData = decodedToken.payload;

        const encryptedUserId = encryptData(payloadData.jti);
        const encryptedUsername = encryptData(payloadData.sub);

        localStorage.setItem(USERID_KEY, encryptedUserId);
        localStorage.setItem(USERNAME_KEY, encryptedUsername);
      }
    }
  }
}
