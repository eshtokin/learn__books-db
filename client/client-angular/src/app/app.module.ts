import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthFomrComponent } from './auth-form/auth-fomr.component';
import { AuthFormRegComponent } from './auth-form/auth-form-reg/auth-form-reg.component';
import { AuthFormLoginComponent } from './auth-form/auth-form-login/auth-form-login.component';
import { UserManagerComponent } from './admin/user-manager/user-manager.component';
import { UserService } from './service/users.service';
import { ProfileComponent } from './shared/profile/profile.component';
import { UserInfo } from './service/user-info.service';
import { AdminGuardService } from './guard/admin-guard.service';
import { UserGuardService } from './guard/user-gurad.service';
import { CatalogComponent } from './shared/catalog/catalog.component';
import { GoogleBooks } from './service/google-books.service';
import { BookService } from './service/books.service';
import { BooksManagerComponent } from './admin/books-manager/books-manager.component';
import { FavoritesComponent } from './shared/favorites/favorites.component';
import { FavoritesModalComponent } from './shared/favorites/favorites-modal/favorites-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UserFormAddEditeModalComponent } from './admin/user-manager/user-forms-add-adite-modal/user-forms-add-adite-modal.component';
import { UserDeleteModalComponent } from './admin/user-manager/user-delete-modal/user-delete-modal.component';
import { BookComponent } from './shared/book/book.component';
import { BookEditeModalComponent } from './shared/book/book-edite-modal/book-edite-modal.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FilterComponent } from './shared/filter/filter.component';
import { ProfileEditeModalComponent } from './shared/profile/profile-edite-modal/profile-edite-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthFomrComponent,
    AuthFormRegComponent,
    AuthFormLoginComponent,
    UserManagerComponent,
    ProfileComponent,
    CatalogComponent,
    BooksManagerComponent,
    FavoritesComponent,
    FavoritesModalComponent,
    UserFormAddEditeModalComponent,
    UserDeleteModalComponent,
    BookComponent,
    BookEditeModalComponent,
    FilterComponent,
    ProfileEditeModalComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  entryComponents: [
    UserDeleteModalComponent,
    FavoritesModalComponent,
    UserFormAddEditeModalComponent,
    BookEditeModalComponent,
    ProfileEditeModalComponent
  ],
  providers: [
    UserService,
    UserInfo,
    AdminGuardService,
    UserGuardService,
    GoogleBooks,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
