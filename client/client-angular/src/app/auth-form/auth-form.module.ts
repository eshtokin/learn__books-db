import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthFormRegComponent } from './auth-form-reg/auth-form-reg.component';
import { AuthFomrComponent } from './auth-fomr.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../service/users.service';



@NgModule({
  declarations: [
    AuthFomrComponent,
    AuthFormLoginComponent,
    AuthFormRegComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AuthFomrComponent },
      { path: 'login', component: AuthFormLoginComponent },
      { path: 'registr', component: AuthFormRegComponent }
    ]),

    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    UserService
  ]
})
export class AuthModule { }
