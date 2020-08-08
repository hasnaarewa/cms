import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductActions, ProductActionTypes } from '../actions/product';
export interface State {
    loading: boolean;
    error: any;
    products: any;
    response: any
}

export const initialState: State = {
    loading: false,
    error: null,
    products: null,
    response: null
};

export function reducer(
    state = initialState,
    action: ProductActions,
): State {
    switch (action.type) {
        case ProductActionTypes.ProductAll: {
            return {
                ...state,
                loading: true,
            };
        }
        case ProductActionTypes.ProductSave: {
            return {
                ...state,
                loading: true
            };
        }
        case ProductActionTypes.ProductDelete: {
            return {
                ...state,
                loading: true
            };
        }


        case ProductActionTypes.ProductSuccess: {
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: null,
            };
        }

        case ProductActionTypes.ProductFail: {

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

export const getProductState = createFeatureSelector<State>('products');
export const getProduct = (state: State) => state.products;

export const getResponse = (state: State) => state.response;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;


export const getProductData = createSelector(getProductState, getProduct);

export const isLoading = createSelector(getProductState, getLoading);
export const getErrors = createSelector(getProductState, getError);
export const Response = createSelector(getProductState, getResponse);

