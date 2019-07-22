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
import { AuthFormEditComponent } from './auth-form/auth-form-edit/auth-form-edit.component';
import { RouteGuard } from './service/route-guard.service';
import { CatalogComponent } from './catalog/catalog.component';
import { GoogleBooks } from './service/google-books.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthFomrComponent,
    AuthFormRegComponent,
    AuthFormLoginComponent,
    AuthFormEditComponent,
    UserTableComponent,
    ProfileComponent,
    AuthFormEditComponent,
    CatalogComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, UserInfo, RouteGuard, GoogleBooks],
  bootstrap: [AppComponent]
})
export class AppModule {

}
