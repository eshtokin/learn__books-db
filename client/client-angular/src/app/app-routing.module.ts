import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuardService } from './guard/user-gurad.service';
import { AdminGuardService } from './guard/admin-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth-form/auth-form.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./shared/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [UserGuardService]
  },
  {
    path: 'catalog',
    loadChildren: () => import('./shared/catalog/catalog.module').then(m => m.CatalogModule),
    canActivate: [UserGuardService]
  },
  {
    path: 'gbooks',
    loadChildren: () => import('./admin/books-manager/books-manager.module').then(m => m.GBookModule),
    canActivate: [UserGuardService]
  },
  {
    path: 'user-manager' ,
    loadChildren: () => import('./admin/user-manager/user-manager.module').then(m => m.UserManagerModule),
    canActivate: [AdminGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
