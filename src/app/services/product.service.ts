import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpOptions = {
    headers: new HttpHeaders({
      "content-type": "multipart/form-data"
    })
  };
  constructor(private http: HttpClient) { }




  save(data): Promise<any> {
    let formData = new FormData();
    formData.append("image", data.image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("qte", data.qte);
    formData.append("price", data.price);
    return this.http
      .post<any>(`${environment.backend_url}${data.catref}/product`,formData)
      .toPromise();
  }
  all(marketplace_ref): Promise<any> {
      console.log("all")

    return this.http
      .get<any>(`${environment.backend_url}${marketplace_ref}/products`)
      .toPromise();
  }
  delete(data): Promise<any> {

    return this.http
      .delete<any>(`${environment.backend_url}${data.market_id}/category/${data.categ_id}`)
      .toPromise();
  }
}
