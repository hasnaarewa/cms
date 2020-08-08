import { createFeatureSelector, createSelector } from '@ngrx/store';


import { AccountActions, AccountActionType } from '../actions/account';
export interface State {
    loading: boolean;
    error: any;
    user: any;
    response: any
}

export const initialState: State = {
    loading: false,
    error: null,
    user: null,
    response: null
};

export function reducer(
    state = initialState,
    action: AccountActions,
): State {
    switch (action.type) {
        case AccountActionType.activateAccount: {
            return {
                ...state,
                loading: true,
            };
        }

        case AccountActionType.ActivateSuccess: {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                response: action.payload.status,
                error: null,
            };
        }

        case AccountActionType.ActivateFail: {

            return {
                ...state,
                loading: false,
                error: action.payload.error.message,
                response:"your account not activated"
            };
        }

        default:
            return state;

    }
}

export const getAccountState = createFeatureSelector<State>('account');
export const getAuth = (state: State) => state.user;

export const getResponse = (state: State) => state.response;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;


export const getAuthData = createSelector(getAccountState, getAuth);

export const isLoading = createSelector(getAccountState, getLoading);
export const getErrors = createSelector(getAccountState, getError);
export const Response = createSelector(getAccountState, getResponse);

