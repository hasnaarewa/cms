import { Action } from '@ngrx/store';




export enum AccountActionType {
    activateAccount = '[Account] activate Account',

    ActivateSuccess = '[Account] activate Account Success',
    ActivateFail = '[Account] activate Account Fail',
}

export class activateAccount implements Action {
    readonly type = AccountActionType.activateAccount;
    constructor(public payload: any) {

    }
}

export class ActivateSuccess implements Action {
    readonly type = AccountActionType.ActivateSuccess;
    constructor(public payload: any) { }
}
export class ActivateFail implements Action {
    readonly type = AccountActionType.ActivateFail;
    constructor(public payload: any) { }
}


export type AccountActions =activateAccount | ActivateSuccess 
 | ActivateFail