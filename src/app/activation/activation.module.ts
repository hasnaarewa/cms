import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ActivationComponent } from './activation.component';
const homeRoutes: Routes = [
  {
    path: '',
    component: ActivationComponent,
  }
    ];

@NgModule({
  declarations: [ActivationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    FormsModule
    
  ]
})
export class ActivationModule { }
