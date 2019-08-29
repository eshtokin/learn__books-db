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
import { ProfileEditeModalComponent } from './profile-edite-modal/profile-edite-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoritesDeleteModalComponent } from '../favorites/favorite-delete-modal/favorites-delete-modal.component';

@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent,
    FavoritesModalComponent,
    FavoritesDeleteModalComponent,
    ProfileEditeModalComponent
  ],
  entryComponents: [
    FavoritesModalComponent,
    FavoritesDeleteModalComponent,
    ProfileEditeModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
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
