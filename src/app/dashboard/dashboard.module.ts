import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule } from '@angular/forms';
const homeRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'products',
        component: ProductsComponent},
        {
          path: 'category',
          component: CategoryComponent}
      
      
      ]},
    ];

@NgModule({
  declarations: [DashboardComponent,ProductsComponent,CategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    FormsModule
    
  ]
})
export class DashboardModule { }
