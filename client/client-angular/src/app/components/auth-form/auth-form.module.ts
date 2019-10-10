import { NgModule } from '@angular/core';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { AuthFormLoginComponent } from 'src/app/components/auth-form/auth-form-login/auth-form-login.component';
import { AuthFormRegComponent } from 'src/app/components/auth-form/auth-form-reg/auth-form-reg.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { ReactiveFormHelper } from 'src/app/services/reactive-form-helper';

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
    UserService,
    ReactiveFormHelper
  ]
})
export class AuthModule { }
