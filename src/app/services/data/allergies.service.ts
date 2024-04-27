import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AuthenticationService } from '../auth/authentication.service';
import { History } from '../../interfaces/allergies.interface';


@Injectable({
  providedIn: 'root',
})
export class AllergiesService {
  allergyId = '';
  userId: string | undefined = '';
  historyData = History;

  


  constructor(
    private _http: HttpClient,
    private _authService: AuthenticationService
  ) {
    this.userId = this._authService.getUserDeatils()?.userId;
  }

  getRecordedAllergy(): Observable<any[]> {
    const userId = { userId: this.userId };

    return this._http.post<any[]>(
      `${environment.BACKEND_API_BASE_URL}/allergy/history`,
      userId
    );
  }


  deleteItem(id: string): Observable<any> {
    return this._http.delete<any>(
      `${environment.BACKEND_API_BASE_URL}/allergy/delete/${id}`
    )
  }

  getALlergyDetails(id?:string): Observable<any> {
    return this._http.get<any>(`${environment.BACKEND_API_BASE_URL}/allergy/history/my-allergy/${id}`
    )
  
  }

  sendAllergyData(formData: Object): Observable<any> {
    return this._http.post<object>(
      `${environment.NGROK_API_BASE_URL}/allergy/chat/${this.userId}`,
      formData
    );
  }


}
