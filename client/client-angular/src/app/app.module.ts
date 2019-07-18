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

@NgModule({
  declarations: [
    AppComponent,
    AuthFomrComponent,
    AuthFormRegComponent,
    AuthFormLoginComponent,
    AuthFormEditComponent,
    UserTableComponent,
    ProfileComponent,
    AuthFormEditComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, UserInfo],
  bootstrap: [AppComponent]
})
export class AppModule {

}
