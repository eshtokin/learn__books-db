import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthFomrComponent } from './auth-form/auth-fomr.component';
import { AuthFormRegComponent } from './auth-form/auth-form-reg/auth-form-reg.component';
import { AuthFormLoginComponent } from './auth-form/auth-form-login/auth-form-login.component';
import { UserTableComponent } from './admin/user-table/user-table.component';
import { UserService } from './service/users.service';
import { ProfileComponent } from './shared/profile/profile.component';
import { UserInfo } from './service/user-info.service';
import { RouteGuard } from './guard/route.guard';
import { CatalogComponent } from './shared/catalog/catalog.component';
import { GoogleBooks } from './service/google-books.service';
import { BookService } from './service/books.service';
import { DbViewerComponent } from './admin/db-viewer/db-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthFomrComponent,
    AuthFormRegComponent,
    AuthFormLoginComponent,
    UserTableComponent,
    ProfileComponent,
    CatalogComponent,
    DbViewerComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    UserInfo,
    RouteGuard,
    GoogleBooks,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
