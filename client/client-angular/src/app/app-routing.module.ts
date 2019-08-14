import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthFomrComponent } from './auth-form/auth-fomr.component';
import { AuthFormLoginComponent } from './auth-form/auth-form-login/auth-form-login.component';
import { AuthFormRegComponent } from './auth-form/auth-form-reg/auth-form-reg.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { UserManagerComponent } from './admin/user-manager/user-manager.component';
import { RouteGuard } from './guard/route.guard';
import { CatalogComponent } from './shared/catalog/catalog.component';
import { BooksManagerComponent } from './admin/books-manager/books-manager.component';
import { FavoritesComponent } from './shared/favorites/favorites.component';

const authRoutes: Routes = [
  {path: 'login', component: AuthFormLoginComponent},
  {path: 'registr', component: AuthFormRegComponent}
];

const routes: Routes = [
  {path: 'auth', component: AuthFomrComponent},
  {path: 'auth', component: AuthFomrComponent, children: authRoutes},
  {path: 'catalog', component: CatalogComponent},
  {path: 'dbviewer', component: BooksManagerComponent},
  {path: 'user-manager', component: UserManagerComponent, canActivate: [RouteGuard]},
  {path: 'profile', component: ProfileComponent},
  {path: 'favorites', component: FavoritesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
