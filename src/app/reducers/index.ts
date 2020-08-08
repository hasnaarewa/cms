import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateSerializer } from '@ngrx/router-store';

import * as fromCategory from './category'
import * as fromProduct from './product'
import * as fromAuth from './auth'
import * as fromAccount from './account'
export interface RouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export class CustomRouterStateSerializer
    implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route = routerState.root;
        while (route.firstChild) {
            route = route.firstChild;
        }

        const { url, root: { queryParams } } = routerState;
        const { params } = route;
        return { url, params, queryParams };
    }
}

export interface State {
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    category: fromCategory.State;
    products:fromProduct.State;
    auth: fromAuth.State;
    account:fromAccount.State;
}

export const reducers: ActionReducerMap<State> = {
    router: fromRouter.routerReducer,
    category: fromCategory.reducer,
    auth: fromAuth.reducer,
    products:fromProduct.reducer,
    account:fromAccount.reducer
};
export const getURl = (state: any) => {
    return state.state.url
};
export const getRouterState = createFeatureSelector<RouterStateUrl>('router');

export const URL = createSelector(getRouterState, getURl);
