import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AllergiesService {
  userId = this._authService.getUserDeatils()?.userId;

  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService
  ) {}

  getRecordedAllergy(): Observable<any[]> {
    return this._http.post<any[]>(
      `${environment.BACKEND_API_BASE_URL}/allergy/history/`, this.userId
    );
  }

  sendAllergyData(formData: Object): Observable<any> {
    return this._http.post<object>(
      `${environment.BACKEND_API_BASE_URL}/allergy/chat/${this.userId}`,
      formData
    );
  }
}
