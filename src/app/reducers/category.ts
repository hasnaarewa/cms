import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CategoryActions, CategoryActionTypes } from '../actions/category';
export interface State {
    loading: boolean;
    error: any;
    category: any;
    response: any
}

export const initialState: State = {
    loading: false,
    error: null,
    category: null,
    response: null
};

export function reducer(
    state = initialState,
    action: CategoryActions,
): State {
    switch (action.type) {
        case CategoryActionTypes.CategoryAll: {
            return {
                ...state,
                loading: true,
            };
        }
        case CategoryActionTypes.CategorySave: {
            return {
                ...state,
                loading: true
            };
        }
        case CategoryActionTypes.CategoryDelete: {
            return {
                ...state,
                loading: true
            };
        }


        case CategoryActionTypes.CategorySuccess: {
            return {
                ...state,
                loading: false,
                category: action.payload,
                error: null,
            };
        }

        case CategoryActionTypes.CategoryFail: {

            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }

        default:
            return state;

    }
}

export const getCategoryState = createFeatureSelector<State>('category');
export const getCategory = (state: State) => state.category;

export const getResponse = (state: State) => state.response;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;


export const getCategoryData = createSelector(getCategoryState, getCategory);

export const isLoading = createSelector(getCategoryState, getLoading);
export const getErrors = createSelector(getCategoryState, getError);
export const Response = createSelector(getCategoryState, getResponse);

