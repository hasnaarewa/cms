import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { combineLatest, Observable, of, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthActionsType, AuthSignIn, AuthSuccess, AuthFail, getUser, getUserSuccess } from '../actions/auth';
import { Router } from '@angular/router';
import { CookiesService } from '../services/cookies.service';
import { AccountActionType, activateAccount, ActivateSuccess, ActivateFail } from '../actions/account';


@Injectable()
export class AccountEffects {
  constructor(private actions$: Actions, private authService: AuthService,
              private router: Router,private cookiesService :CookiesService ) {


  }

  @Effect()
  activate$: Observable<Action> = this.actions$.pipe(
    ofType(AccountActionType.activateAccount),
    map((action: activateAccount) => action.payload),
    mergeMap((data: any) =>
    from(this.authService.activate(data))
    .pipe(
      mergeMap((result: any) => of<Action>(new ActivateSuccess(result))),
      catchError(error => of(new ActivateFail(error)))
    )
    )
  );
  @Effect({ dispatch: false })
  ActivateSuccess: Observable<any> = this.actions$.pipe(
    ofType(AccountActionType.ActivateSuccess),
    tap((user) => {

      this.router.navigateByUrl('/login');
    })
  );
  @Effect({ dispatch: false })
  ActivateFail: Observable<any> = this.actions$.pipe(
    ofType(AccountActionType.ActivateFail),
    tap((user) => {

      this.router.navigateByUrl('/login');
    })
  );

}
