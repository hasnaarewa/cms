import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthActions, AuthActionsType } from '../actions/auth';
export interface State {
    loading: boolean;
    error: any;
    isAuthentificated:boolean,
    user: any;
    response: any
}

export const initialState: State = {
    loading: false,
    error: null,
    user: null,
    isAuthentificated:false,
    response: null
};

export function reducer(
    state = initialState,
    action: AuthActions,
): State {
    switch (action.type) {
        case AuthActionsType.AuthSignIn: {
            return {
                ...state,
                loading: true,
            };
        }
        case AuthActionsType.getUser: {
            return {
                ...state,
                loading: true,
            };
        }
        case AuthActionsType.AuthSuccess: {
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthentificated:true,
                error: null,
            };
        }
        case AuthActionsType.getUserSuccess: {
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthentificated:true,
                error: null,
            };
        }
        case AuthActionsType.AuthFail: {

            return {
                ...state,
                loading: false,
                error: action.payload.error.message
            };
        }

        default:
            return state;

    }
}

export const getAuthState = createFeatureSelector<State>('auth');
export const getAuth = (state: State) => state.user;

export const getResponse = (state: State) => state.response;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;


export const getAuthData = createSelector(getAuthState, getAuth);

export const isLoading = createSelector(getAuthState, getLoading);
export const getErrors = createSelector(getAuthState, getError);
export const Response = createSelector(getAuthState, getResponse);

