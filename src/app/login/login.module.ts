import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent},
    ];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(loginRoutes)
  ]
})
export class LoginModule { }
