import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import * as fromAccount from '../reducers/account'
import { Store } from '@ngrx/store';
import { activateAccount } from '../actions/account';
@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  currentUrl = ''
  params$: Observable<any>;
  subscriptions: Subscription[];
  constructor(private _activatedRoute: ActivatedRoute,
    private store: Store<fromAccount.State>,private router: Router) { 
   this.params$= _activatedRoute.queryParams
   this.subscriptions=[]
  }

  ngOnInit(): void {
    this.subscriptions.push(this.params$.pipe(
      concatMap(data => {

        return data ?from(this.checkParams(data)):from([])
      })
    ).subscribe());
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());

  }

  verify(params){
    console.log("here")
   if(params.action==='verify'&&params.tkt!==undefined){
   this.store.dispatch(new activateAccount(params.tkt))
   }else{

   }
  }
  async checkParams(data){
    let p = new Promise((resolve, reject) => {
       console.log(data);
       this.verify(data)
      
      resolve(true)

    });
    await p
  }
}
