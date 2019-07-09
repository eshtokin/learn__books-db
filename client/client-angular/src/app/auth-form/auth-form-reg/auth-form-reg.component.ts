import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users.service';

@Component({
  selector: 'app-auth-form-reg',
  templateUrl: './auth-form-reg.component.html',
  styleUrls: ['./auth-form-reg.component.sass']
})
export class AuthFormRegComponent {
  constructor(private userService: UserService) {}

  roles: number[] = [2, 1];

  user = {
    email: '',
    password: '',
    name: '',
    role: 2
  };

  registrate = this.userService.registrate;
}
