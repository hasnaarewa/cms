import { Action } from '@ngrx/store';




export enum AuthActionsType {
    Auth = '[Auth] Auth',
    getUser = '[Auth] Auth user',
    getUserSuccess = '[Auth] Auth user success',
    AuthSignIn = '[Auth] Auth sign in',
    AuthSuccess = '[Auth] Auth Success',
    AuthFail = '[Auth] Auth Fail',
}

export class Auth implements Action {
    readonly type = AuthActionsType.Auth;
    constructor(public payload: any) {

    }
}

export class AuthSignIn implements Action {
    readonly type = AuthActionsType.AuthSignIn;
    constructor(public payload: any) { }
}
export class AuthSuccess implements Action {
    readonly type = AuthActionsType.AuthSuccess;
    constructor(public payload: any) { }
}
export class getUser implements Action {
    readonly type = AuthActionsType.getUser;
    constructor(public accessToken: any) { }
}
export class getUserSuccess implements Action {
    readonly type = AuthActionsType.getUserSuccess;
    constructor(public payload: any) { }
}
export class AuthFail implements Action {
    readonly type = AuthActionsType.AuthFail;
    constructor(public payload: any) { }
}


export type AuthActions =AuthSignIn | AuthSuccess 
 | AuthFail | getUser |getUserSuccess