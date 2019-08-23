import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { ProfileComponent } from './profile.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { ProfileEditeModalComponent } from './profile-edite-modal/profile-edite-modal.component';
import { FavoritesModalComponent } from '../favorites/favorites-modal/favorites-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserService } from 'src/app/service/users.service';



@NgModule({
  declarations: [
    ProfileComponent,
    FavoritesComponent,
    FavoritesModalComponent,
    ProfileEditeModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    UserService
  ],
  entryComponents: [
    FavoritesModalComponent,
    ProfileEditeModalComponent
  ],
  exports: []
})
export class ProfileModule { }
