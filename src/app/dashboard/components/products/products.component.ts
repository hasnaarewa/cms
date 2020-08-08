import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCategory from '../../../reducers/category'
import * as fromProducts from '../../../reducers/product'
import * as fromAuth from '../../../reducers/auth'
import { CategorySave, CategoryAll, CategoryDelete } from '../../../actions/category';
import { Subscription, Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ProductAll, ProductSave } from 'src/app/actions/product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  savedProduct = {
    title: '',
    description: '',
    qte:0,
    price:0,
    catref:''
  }
  ismodalvisible=false
  idprodToEdit=''
  ismodalremoveVisible=false
  imgName
  dataNewImageFile
  dataNewImage
  catToRemove={
    _id:"",
    title:""
  }
  subscriptions: Subscription[];
  user$: Observable<any>;
  category$: Observable<any>;
  products$: Observable<any>;
  loadingsave$: Observable<any>;
  isloadingsave=false
  currentUser={
    type:null,
    name:null,
    ref:null
  }
  constructor(
    private store: Store<fromCategory.State>,
  ) {
    this.user$ = this.store.pipe(select(fromAuth.getAuthData));
    this.loadingsave$ = this.store.pipe(select(fromProducts.isLoading));
    this.category$ = this.store.pipe(select(fromCategory.getCategoryData));
    this.products$ = this.store.pipe(select(fromProducts.getProductData));
    this.subscriptions=[]
   }
  
  ngOnInit(): void {
    this.subscriptions.push(this.user$.pipe(
      concatMap(data => {
  
        return data ?from(this.setUser(data)):from([])
      })
    ).subscribe());
  
    this.subscriptions.push(this.loadingsave$.pipe(
      concatMap(data => {
  
        return from(this.setLoadingSave(data))
      })
    ).subscribe());
  
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  
  }
  saveProduct(){
    if(this.idprodToEdit){
   this.doUpdate()
    }else{
      this.doSave()
    }
  
  }
  doUpdate(){
  
  }
  onchangeSelect(evt){
    console.log(this.savedProduct.catref)
  }
  doSave(){
    if(this.dataNewImageFile&& this.savedProduct.description &&  this.savedProduct.title
      &&this.savedProduct.catref
      ){
      this.store.dispatch(new ProductSave(Object.assign({},this.savedProduct,{
        image:this.dataNewImageFile
      })))
      this.savedProduct.description=''
      this.savedProduct.title=''
      this.imgName=''
      this.dataNewImage=null
      this.dataNewImageFile=null
        }
  }
  OnDeleteCategory(){
    this.store.dispatch(new CategoryDelete({
      categ_id:this.catToRemove._id,
      market_id:this.currentUser.ref}))
  }
  canEditCategory(item){
    this.savedProduct.description=item.description
  this.savedProduct.title=item.title
  this.idprodToEdit=item._id
  this.ismodalvisible=!this.ismodalvisible
  }
  setDescription(evt){
    this.savedProduct.description=evt.target.value;
  }
  changeModel(){
    this.ismodalvisible=!this.ismodalvisible
  }
  hideRemoveModal(){
  
    this.ismodalremoveVisible=false
  }
  canRemoveCategory(cat){
    this.ismodalremoveVisible=!this.ismodalremoveVisible
    this.catToRemove=cat
  }
  doLoadCategory(){

    this.store.dispatch(new CategoryAll(this.currentUser.ref))
  }
  doLoadProducts(){

    this.store.dispatch(new ProductAll(this.currentUser.ref))
  }
  async setUser(data){
    let p = new Promise((resolve, reject) => {
  
      this.currentUser = data
      this.doLoadCategory()
      this.doLoadProducts()
      resolve(true)
  
    });
    await p
  }
  
  async setLoadingSave(data){
    let p = new Promise((resolve, reject) => {
    
      this.isloadingsave = data
      setTimeout(() => {
        this.ismodalvisible=false
        this.ismodalremoveVisible=false
      }, 1200);
      resolve(true)
  
    });
    await p
  }
  
  onImageChaneg(event){
    var input = event.target;
  
    let self = this;
    if (input.files && input.files[0]) {
     this.imgName=input.files[0].name;
      this.dataNewImageFile = input.files[0];
      var reader = new FileReader();
      reader.onload = e => {
        this.dataNewImage = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

}
