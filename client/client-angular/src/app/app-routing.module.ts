import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth-form/auth-form.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./shared/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'catalog',
    loadChildren: () => import('./shared/catalog/catalog.module').then(m => m.CatalogModule)
  },
  {
    path: 'gbooks',
    loadChildren: () => import('./admin/books-manager/books-manager.module').then(m => m.GBookModule)
  },
  {
    path: 'user-manager' ,
    loadChildren: () => import('./admin/user-manager/user-manager.module').then(m => m.UserManagerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
