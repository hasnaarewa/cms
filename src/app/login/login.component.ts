import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../reducers/auth';
import * as fromAccount from '../reducers/account';
import { AuthSignIn } from '../actions/auth';
import { Observable, Subscription, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData = {
    e: '',
    pwd: ''
  };
  erromsg = null;
  isvisible=true
  loading$: Observable<any>;
  error$: Observable<any>;
  errorActivation$: Observable<any>;
  responseActivation$: Observable<any>;
  isloading:false
   subscriptions: Subscription[];
  constructor(private store: Store<fromAuth.State>) { 
    this.loading$ = this.store.pipe(select(fromAuth.isLoading));
    this.error$ = this.store.pipe(select(fromAuth.getErrors));
    this.errorActivation$ = this.store.pipe(select(fromAccount.getErrors));
    this.responseActivation$ = this.store.pipe(select(fromAccount.Response));
    this.subscriptions = []
  }

  ngOnInit(): void {
    this.subscriptions.push(this.loading$.pipe(
      concatMap(data => {

        return from(this.setLoading(data))
      })
    ).subscribe());
    this.subscriptions.push(this.error$.pipe(
      concatMap(data => {

        return data ? from(this.setError(data)):from([])
      })
    ).subscribe());
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

  }
  doLogin() {
    if (!this.userData.pwd || !this.userData.e) {
      this.erromsg = 'fill all required fields';
    }else{
      this.store.dispatch(new AuthSignIn(this.userData));
    }
  }

  resetError(){
    this.erromsg = null;
  }
  async setLoading(data){
    let p = new Promise((resolve, reject) => {
     
      this.isloading = data
      resolve(true)

    });
    await p
  }
  setvisible(){
    this.isvisible=!this.isvisible
  }
  async setError(data){
    let p = new Promise((resolve, reject) => {
   
      this.erromsg = data
      resolve(true)

    });
    await p
  }

}
