import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthFomrComponent } from './auth-form/auth-fomr.component';
import { AuthFormLoginComponent } from './auth-form/auth-form-login/auth-form-login.component';
import { AuthFormRegComponent } from './auth-form/auth-form-reg/auth-form-reg.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { UserManagerComponent } from './admin/user-manager/user-manager.component';
import { AdminGuardService } from './guard/admin-guard.service';
import { CatalogComponent } from './shared/catalog/catalog.component';
import { BooksManagerComponent } from './admin/books-manager/books-manager.component';
import { FavoritesComponent } from './shared/favorites/favorites.component';
import { UserGuardService } from './guard/user-gurad.service';

const authRoutes: Routes = [
  {path: 'login', component: AuthFormLoginComponent},
  {path: 'registr', component: AuthFormRegComponent}
];

const routes: Routes = [
  {path: 'auth', component: AuthFomrComponent, canActivate: [UserGuardService]},
  {path: 'auth', component: AuthFomrComponent, children: authRoutes},
  {path: 'catalog', component: CatalogComponent, canActivate: [UserGuardService]},
  {path: 'dbviewer', component: BooksManagerComponent, canActivate: [UserGuardService]},
  {path: 'user-manager', component: UserManagerComponent, canActivate: [AdminGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [UserGuardService]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [UserGuardService]},
  {path: '', component: AuthFomrComponent, children: authRoutes}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
