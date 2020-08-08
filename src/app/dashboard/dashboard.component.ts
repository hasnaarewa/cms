import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromAuth from '../reducers/auth'
import { Store, select } from '@ngrx/store';
import { Subscription, Observable, from } from 'rxjs';
import { getUser } from '../actions/auth';
import { CookiesService } from '../services/cookies.service';
import { concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUrl = ''
  user$: Observable<any>;
  currentUser={
    type:null,
    name:null
  }
  subscriptions: Subscription[];
  constructor(private router: Router,
    private cookiesService:CookiesService,
    private store: Store<fromAuth.State>) {
      this.user$ = this.store.pipe(select(fromAuth.getAuthData));
    this.currentUrl = this.router.url
    this.subscriptions=[]
  }

  ngOnInit(): void {

    this.subscriptions.push(this.user$.pipe(
      concatMap(data => {

        return data ?from(this.setUser(data)):from([])
      })
    ).subscribe());
    this.loadUser()
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

  }
  activeMenu() {
    let p = this.currentUrl.split('/')[2]
    return p
  }
  loadUser(){
    let token=this.cookiesService.get('access_token')
    this.store.dispatch(new getUser(token))
  }
  async setUser(data){
    let p = new Promise((resolve, reject) => {
       console.log(data);
      this.currentUser = data
      resolve(true)

    });
    await p
  }

}
