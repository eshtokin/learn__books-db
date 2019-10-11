import { Routes, RouterModule } from '@angular/router';
import { UserGuardService } from './core.module/guard/user-gurad.service';
import { AdminGuardService } from './core.module/guard/admin-guard.service';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/components/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/components/auth-form/auth-form.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('src/app/components/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [UserGuardService],
    //  data:
  },
  {
    path: 'catalog',
    loadChildren: () => import('src/app/components/google-book/google-book.module').then(m => m.GoogleBooksModule),
    canActivate: [UserGuardService]
  },
  {
    path: 'gbooks',
    loadChildren: () => import('src/app/components/books-manager/books-manager.module').then(m => m.GBookModule),
    canActivate: [UserGuardService]
  },
  {
    path: 'filtered',
    loadChildren: () => import('src/app/components/filtered-book/filtered-book.module').then(m => m.FilteredBookModule),
    canActivate: [UserGuardService]
  },
  {
    path: 'user-manager' ,
    loadChildren: () => import('src/app/components/user-manager/user-manager.module').then(m => m.UserManagerModule),
    canActivate: [AdminGuardService]
  },
  {
    path: '**',
    loadChildren: () => import('src/app/components/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
