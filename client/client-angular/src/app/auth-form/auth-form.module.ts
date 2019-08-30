import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthFormRegComponent } from './auth-form-reg/auth-form-reg.component';
import { AuthFormComponent } from './auth-form.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../service/users.service';



@NgModule({
  declarations: [
    AuthFormComponent,
    AuthFormLoginComponent,
    AuthFormRegComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AuthFormComponent },
      { path: 'login', component: AuthFormLoginComponent },
      { path: 'registr', component: AuthFormRegComponent }
    ])
  ],
  providers: [
    UserService
  ]
})
export class AuthModule { }
