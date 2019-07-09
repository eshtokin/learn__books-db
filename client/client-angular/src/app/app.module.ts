import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthFomrComponent } from './auth-form/auth-fomr.component';
import { AuthFormRegComponent } from './auth-form/auth-form-reg/auth-form-reg.component';
import { AuthFormLoginComponent } from './auth-form/auth-form-login/auth-form-login.component';
import { UserTableComponent } from './admin/user-table/user-table.component';
import { UserService } from './service/users.service';
import { ProfileComponent } from './shared/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AuthFomrComponent,
    AuthFormRegComponent,
    AuthFormLoginComponent,
    UserTableComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
