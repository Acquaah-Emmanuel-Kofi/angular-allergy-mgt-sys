import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import {
  DecodedToken,
} from '../../interfaces/decodeJwt.interface';
import {
  ACCESS_TOKEN_KEY,
  USERID_KEY,
  USERNAME_KEY,
  decodeJwt,
  decryptData,
  encryptData,
} from '../../utility/constants/auth.constants';
import { User } from '../../interfaces/allergies.interface';


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


   getPicture(){
    const hold : string = localStorage.getItem(ACCESS_TOKEN_KEY)  as string;
    if (hold) {
   const picture = decodeJwt(hold);
    return picture?.payload.picture;
      
    }

   }

   getName(){
    const hold : string = localStorage.getItem(ACCESS_TOKEN_KEY)  as string;
    if (hold) {
   const picture = decodeJwt(hold);
    return picture?.payload.given_name;
      
    }
    
   }

   getEmail(){
    const hold : string = localStorage.getItem(ACCESS_TOKEN_KEY)  as string;
    if (hold) {
   const picture = decodeJwt(hold);
    return picture?.payload.email;
      
    }
    
   }
   getLastName(){
    const hold : string = localStorage.getItem(ACCESS_TOKEN_KEY)  as string;
    if (hold) {
   const picture = decodeJwt(hold);
    return picture?.payload.family_name;
      
    }
    
   }



  getAccessTokenn(): string | null {
		const token = localStorage.getItem(ACCESS_TOKEN_KEY);

		if (token) {
			const decryptToken = decryptData(token);
			return decryptToken;
		}

		return null;
	}
  isLoggedIn(): boolean {
    const token = this.getAccessTokenn();

    return token ? true : false;
  }

  logoutUser(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem('picture');
    this._router.navigateByUrl('/login');
  }

  getUserDeatils() {
    const userIdFromLocalStorage = localStorage.getItem(USERID_KEY);
    const usernameFromLocalStorage = localStorage.getItem(USERNAME_KEY);
  
    // console.log("before if",userIdFromLocalStorage,usernameFromLocalStorage);
    
   
    if (userIdFromLocalStorage !== null && usernameFromLocalStorage !== null) {
      const userId = decryptData(userIdFromLocalStorage);
      const username = decryptData(usernameFromLocalStorage);
      // console.log( "After if",userId,username);
      

      return {userId, username ,};
    }

    return null;
  }

  saveUserDeatils(accessToken: string): void {
    const decryptedAccessToken = decryptData(accessToken);

    if (decryptedAccessToken) {
      // Decode the JWT token
      const decodedToken: DecodedToken | null = decodeJwt(decryptedAccessToken);

      // Access the data from the payload
      if (decodedToken) {
        const payloadData = decodedToken.payload;

        const encryptedUserId = encryptData(payloadData.jti);
        const encryptedUsername = encryptData(payloadData.sub);

        localStorage.setItem(USERID_KEY, encryptedUserId);
        localStorage.setItem(USERNAME_KEY, encryptedUsername);
      }
    }
  }
}
