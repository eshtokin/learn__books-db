import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { FavoritesModalComponent } from '../favorites/favorites-modal/favorites-modal.component';
import { FavoritesDeleteModalComponent } from '../favorites/favorite-delete-modal/favorites-delete-modal.component';
import { ProfileEditeModalComponent } from './profile-edite-modal/profile-edite-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { BookService } from 'src/app/services/books.service';

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
    SharedModule,
    MatDialogModule,
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
