import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }


  set(name: string, value: string, expires?: number,
      path?: string, domain?: string, secure?: string, sameSite?: 'Lax' | 'Strict'): void {
      Cookies.set(name, value, { expires:expires });

  }
  get(name:string){
    return Cookies.get(name)
  }

}
