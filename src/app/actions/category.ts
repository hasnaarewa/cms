import { Action } from '@ngrx/store';




export enum CategoryActionTypes {
    CategoryAll = '[Category] Category',

    CategorySave = '[Category] Category save',
    CategoryUpdate = '[Category] Category update',
    CategoryDelete = '[Category] Category delete',
    CategorySuccess = '[Category] Category Success',
    CategoryFail = '[Category] Category Fail',
}

export class CategoryAll implements Action {
    readonly type = CategoryActionTypes.CategoryAll;
    constructor(public ref: any) {

    }
}

export class CategorySave implements Action {
    readonly type = CategoryActionTypes.CategorySave;
    constructor(public payload: any) { }
}
export class CategoryDelete implements Action {
    readonly type = CategoryActionTypes.CategoryDelete;
    constructor(public payload: any) { }
}
export class CategorySuccess implements Action {
    readonly type = CategoryActionTypes.CategorySuccess;
    constructor(public payload: any) { }
}

export class CategoryFail implements Action {
    readonly type = CategoryActionTypes.CategoryFail;
    constructor(public payload: any) { }
}


export type CategoryActions = CategoryAll | CategoryDelete |CategorySave | CategorySuccess 
 | CategoryFail