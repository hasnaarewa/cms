import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCategory from '../../../reducers/category'
import * as fromAuth from '../../../reducers/auth'
import { CategorySave, CategoryAll, CategoryDelete } from 'src/app/actions/category';
import { Subscription, Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
   savedCategory = {
  category_title: '',
  category_description: ''
}
ismodalvisible=false
idcatdToEdit=''
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
  this.loadingsave$ = this.store.pipe(select(fromCategory.isLoading));
  this.category$ = this.store.pipe(select(fromCategory.getCategoryData));
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
saveCategory(){
  if(this.idcatdToEdit){
 this.doUpdate()
  }else{
    this.doSave()
  }

}
doUpdate(){

}
doSave(){
  if(this.dataNewImageFile&& this.savedCategory.category_description &&  this.savedCategory.category_title){
    this.store.dispatch(new CategorySave(Object.assign({},this.savedCategory,{
      marketplace_ref:this.currentUser.ref,
      image:this.dataNewImageFile
    })))
    this.savedCategory.category_description=''
    this.savedCategory.category_title=''
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
  this.savedCategory.category_description=item.description
this.savedCategory.category_title=item.title
this.idcatdToEdit=item._id
this.ismodalvisible=!this.ismodalvisible
}
setDescription(evt){
  this.savedCategory.category_description=evt.target.value;
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
  console.log(this.currentUser.ref);
  this.store.dispatch(new CategoryAll(this.currentUser.ref))
}

async setUser(data){
  let p = new Promise((resolve, reject) => {

    this.currentUser = data
    this.doLoadCategory()
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
