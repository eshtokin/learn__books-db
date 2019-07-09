import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthFomrComponent } from './auth-form/auth-fomr.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthFormLoginComponent } from './auth-form/auth-form-login/auth-form-login.component';
import { AuthFormRegComponent } from './auth-form/auth-form-reg/auth-form-reg.component';
import { ProfileComponent } from './shared/profile/profile.component';

const authRoutes: Routes = [
  {path: 'login', component: AuthFormLoginComponent},
  {path: 'registr', component: AuthFormRegComponent}
];

const routes: Routes = [
  {path: 'not-found', component: NotFoundComponent},
  {path: 'auth', component: AuthFomrComponent},
  {path: 'auth', component: AuthFomrComponent, children: authRoutes},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
