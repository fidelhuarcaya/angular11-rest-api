import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';
import { HomeAdminComponent } from './home/home-admin/home-admin.component';
import { HomeUserComponent } from './home/home-user/home-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [LoginGuard]},
  {path: 'home', component: HomeComponent, canActivate: [HomeGuard]},
  {path: 'home-admin', component: HomeAdminComponent},
  {path: 'home-user', component: HomeUserComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
