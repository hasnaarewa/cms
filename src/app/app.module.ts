import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, ActionReducerMap, MetaReducer,ActionReducer } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CategoryEffects } from './effects/category'
import {ProductEffects}from './effects/product'
import { AuthEffects } from './effects/auth'
import { environment } from '../environments/environment';
import { CustomRouterStateSerializer, reducers } from './reducers';
import { localStorageSync } from './lib';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AccountEffects } from './effects/account';
// const reducerss: ActionReducerMap<IState> = {todos, visibilityFilter};
 
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['auth']})(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState: {

      }
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    },
   ),
    StoreDevtoolsModule.instrument({
      name: 'NgRx HNC DevTools',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([CategoryEffects,AuthEffects,AccountEffects,ProductEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
