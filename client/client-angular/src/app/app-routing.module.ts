import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuardService } from './guard/user-gurad.service';
import { AdminGuardService } from './guard/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./shared/homepage/homepage.module').then(m => m.HomepageModule)
  },
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
    loadChildren: () => import('./admin/google-book/google-book.module').then(m => m.GoogleBooksModule),
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
  },
  {
    path: '**',
    loadChildren: () => import('./shared/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
