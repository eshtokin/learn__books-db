import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../service/users.service';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.sass']
})

export class AuthFormLoginComponent {
  constructor(private service: UserService) {}

  user = {
    email: '',
    password: ''
  };

  login = this.service.login;
}
