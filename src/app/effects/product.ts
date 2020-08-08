import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { combineLatest, Observable, of, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { ProductActionTypes, ProductSave, ProductSuccess, ProductFail, ProductAll, ProductDelete } from '../actions/product';


@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,private ProductService:ProductService) {
 

  }

  @Effect()
  save$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.ProductSave),
    map((action: ProductSave) => action.payload),
    mergeMap((data:any) =>
    from(this.ProductService.save(data))
    .pipe(
      mergeMap((result:any) => of<Action>(new ProductSuccess(result))),
      catchError(error => of(new ProductFail(error)))
    )
    )
  );
  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.ProductDelete),
    map((action: ProductDelete) => action.payload),
    mergeMap((id:any) =>
    from(this.ProductService.delete(id))
    .pipe(
      mergeMap((result:any) => of<Action>(new ProductSuccess(result))),
      catchError(error => of(new ProductFail(error)))
    )
    )
  );
  @Effect()
  getall$: Observable<Action> = this.actions$.pipe(
    ofType(ProductActionTypes.ProductAll),
    map((action: ProductAll) => action.ref),
    mergeMap((ref:any) =>
    from(this.ProductService.all(ref))
    .pipe(
      mergeMap((result:any) => of<Action>(new ProductSuccess(result))),
      catchError(error => of(new ProductFail(error)))
    )
    )
  );
}
