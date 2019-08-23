import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthFormRoutingModule } from './auth-form-routing.module';
import { AuthFomrComponent } from './auth-fomr.component';
import { AuthFormRegComponent } from './auth-form-reg/auth-form-reg.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AuthFomrComponent,
    AuthFormRegComponent,
    AuthFormLoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
    // AuthFormRoutingModule
  ]
})
export class AuthFormModule { }
