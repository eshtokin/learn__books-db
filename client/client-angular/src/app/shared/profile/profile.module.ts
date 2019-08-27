import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/users.service';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared.module';
import { FavoritesComponent } from '../favorites/favorites.component';
import { CommonModule } from '@angular/common';
import { FavoritesModalComponent } from '../favorites/favorites-modal/favorites-modal.component';
import { BookService } from 'src/app/service/books.service';

@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent,
    FavoritesModalComponent
  ],
  entryComponents: [
    FavoritesModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    SharedModule,
    RouterModule.forChild([
      {path: '' , component: ProfileComponent},
      {path: 'favorites', component: FavoritesComponent}
    ])
  ],
  providers: [
    UserService,
    BookService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ProfileModule {}