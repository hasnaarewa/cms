import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [

  {
  path: "dashboard",
  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
},
{
  path: '',   redirectTo: '/login', pathMatch: 'full'
  //  canActivate: [AuthGuard] 
},
{
  path: "login",
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  //  canActivate: [AuthGuard] 
},
{
  path: "account",
  loadChildren: () => import('./activation/activation.module').then(m => m.ActivationModule),
  //  canActivate: [AuthGuard] 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
