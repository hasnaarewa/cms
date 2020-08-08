import { Inject, Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { combineLatest, Observable, of, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { CategoryActionTypes, CategorySave, CategorySuccess, CategoryFail, CategoryAll, CategoryDelete } from '../actions/category';


@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions,private categoryService:CategoryService) {
 

  }

  @Effect()
  save$: Observable<Action> = this.actions$.pipe(
    ofType(CategoryActionTypes.CategorySave),
    map((action: CategorySave) => action.payload),
    mergeMap((data:any) =>
    from(this.categoryService.save(data))
    .pipe(
      mergeMap((result:any) => of<Action>(new CategorySuccess(result))),
      catchError(error => of(new CategoryFail(error)))
    )
    )
  );
  @Effect()
  delete$: Observable<Action> = this.actions$.pipe(
    ofType(CategoryActionTypes.CategoryDelete),
    map((action: CategoryDelete) => action.payload),
    mergeMap((id:any) =>
    from(this.categoryService.delete(id))
    .pipe(
      mergeMap((result:any) => of<Action>(new CategorySuccess(result))),
      catchError(error => of(new CategoryFail(error)))
    )
    )
  );
  @Effect()
  getall$: Observable<Action> = this.actions$.pipe(
    ofType(CategoryActionTypes.CategoryAll),
    map((action: CategoryAll) => action.ref),
    mergeMap((ref:any) =>
    from(this.categoryService.all(ref))
    .pipe(
      mergeMap((result:any) => of<Action>(new CategorySuccess(result))),
      catchError(error => of(new CategoryFail(error)))
    )
    )
  );
}
