import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { combineLatest, Observable, of, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthActionsType, AuthSignIn, AuthSuccess, AuthFail, getUser, getUserSuccess } from '../actions/auth';
import { Router } from '@angular/router';
import { CookiesService } from '../services/cookies.service';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService,
              private router: Router,private cookiesService :CookiesService ) {


  }

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionsType.AuthSignIn),
    map((action: AuthSignIn) => action.payload),
    mergeMap((data: any) =>
    from(this.authService.signin(data))
    .pipe(
      mergeMap((result: any) => of<Action>(new AuthSuccess(result))),
      catchError(error => of(new AuthFail(error)))
    )
    )
  );

  @Effect({ dispatch: false })
LogInSuccess: Observable<any> = this.actions$.pipe(
  ofType(AuthActionsType.AuthSuccess),
  tap((user) => {
      console.log(user);
    this.cookiesService.set('access_token', user.payload.access_token,30);
    this.router.navigateByUrl('/dashboard');
  })
);

@Effect()
loaduser$: Observable<Action> = this.actions$.pipe(
  ofType(AuthActionsType.getUser),
  map((action: getUser) => action.accessToken),
  mergeMap((accessToken: any) =>
  from(this.authService.user(accessToken))
  .pipe(
    mergeMap((result: any) => of<Action>(new getUserSuccess(result))),
    catchError(error => of(new AuthFail(error)))
  )
  )
);
}
