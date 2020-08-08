import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpOptions = {
    headers: new HttpHeaders({
      "content-type": "multipart/form-data"
    })
  };
  constructor(private http: HttpClient) { }




  save(data): Promise<any> {
    let formData = new FormData();
    formData.append("image", data.image);
    formData.append("category_title", data.category_title);
    formData.append("category_description", data.category_description);
    return this.http
      .post<any>(`${environment.backend_url}${data.marketplace_ref}/category`,formData)
      .toPromise();
  }
  all(marketplace_ref): Promise<any> {

    return this.http
      .get<any>(`${environment.backend_url}${marketplace_ref}/category`)
      .toPromise();
  }
  delete(data): Promise<any> {

    return this.http
      .delete<any>(`${environment.backend_url}${data.market_id}/category/${data.categ_id}`)
      .toPromise();
  }
}
