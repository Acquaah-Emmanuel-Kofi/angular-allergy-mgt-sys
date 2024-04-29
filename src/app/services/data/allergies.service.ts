import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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

  private _http = inject(HttpClient);
  private _authService = inject(AuthenticationService);


  constructor() {
    this.userId = this._authService.getUserDeatils()?.userId;
  }

  getRecordedAllergy(): Observable<any[]> {
    const userId = { userId: this.userId };

    return this._http.post<any[]>(
      `${environment.BACKEND_API_BASE_URL}/allergy/history`,
      userId
    );
  }


  deleteItem(id: string): Observable<History> {
    return this._http.delete<History>(
      `${environment.BACKEND_API_BASE_URL}/allergy/delete/${id}`
    )
  }

  getALlergyDetails(id?:string): Observable<History> {
    return this._http.get<History>(`${environment.BACKEND_API_BASE_URL}/allergy/history/my-allergy/${id}`
    )
  
  }

  sendAllergyData(formData: Object): Observable<any> {
    return this._http.post<object>(
      `${environment.NGROK_API_BASE_URL}/allergy/chat/${this.userId}`,
      formData
    );
  }


}
