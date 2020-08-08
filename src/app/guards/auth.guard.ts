import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesService } from '../services/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( public router: Router,public cookiesService:CookiesService) {}

  canActivate() {
    let isroot=this.router.url==='/'
    console.log(this.cookiesService.get('access_token'));
    if(this.cookiesService.get('access_token') && isroot){
this.router.navigate(['dashboard']);
return false
    }
    if(!this.cookiesService.get('access_token') && isroot){
      this.router.navigate(['login']);
      return false
          }
    if(!isroot &&!this.cookiesService.get('access_token') ){
      this.router.navigate(['login']);
      return false;
    }
     this.router.navigate(['login']);
    return false;
   
  }

}
