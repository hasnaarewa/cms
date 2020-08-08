import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }




  signin(data): Promise<any> {
 
    return this.http
      .post<any>(`${environment.backend_url}signin`,data)
      .toPromise();
  }
  user(access_token): Promise<any> {
 
    return this.http
      .get<any>(`${environment.backend_url}user/me`,{
        headers:{
          "Authorization":`Bearer ${access_token}`
        }
      })
      .toPromise();
  }
  activate(access_token): Promise<any> {
 
    return this.http
      .post<any>(`${environment.backend_url}user/activate`,{
       tkt:access_token
      })
      .toPromise();
  }
}
