import { Action } from '@ngrx/store';




export enum ProductActionTypes {
    ProductAll = '[Product] Product',

    ProductSave = '[Product] Product save',
    ProductUpdate = '[Product] Product update',
    ProductDelete = '[Product] Product delete',
    ProductSuccess = '[Product] Product Success',
    ProductFail = '[Product] Product Fail',
}

export class ProductAll implements Action {
    readonly type = ProductActionTypes.ProductAll;
    constructor(public ref: any) {

    }
}

export class ProductSave implements Action {
    readonly type = ProductActionTypes.ProductSave;
    constructor(public payload: any) { }
}
export class ProductDelete implements Action {
    readonly type = ProductActionTypes.ProductDelete;
    constructor(public payload: any) { }
}
export class ProductSuccess implements Action {
    readonly type = ProductActionTypes.ProductSuccess;
    constructor(public payload: any) { }
}

export class ProductFail implements Action {
    readonly type = ProductActionTypes.ProductFail;
    constructor(public payload: any) { }
}


export type ProductActions = ProductAll | ProductDelete |ProductSave | ProductSuccess 
 | ProductFail