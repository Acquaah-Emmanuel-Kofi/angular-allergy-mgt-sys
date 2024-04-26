import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AllergiesService {
  userId: string | undefined = '';

  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService
  ) {
    this.userId = this._authService.getUserDeatils()?.userId;
  }

  getRecordedAllergy(): Observable<any[]> {
    const userId = { userId: this.userId };

    return this._http.post<any[]>(
      `${environment.NGROK_API_BASE_URL}/allergy/history/`,
      userId
    );
  }

  sendAllergyData(formData: Object): Observable<any> {
    return this._http.post<object>(
      `${environment.NGROK_API_BASE_URL}/allergy/chat/${this.userId}`,
      formData
    );
  }
}
