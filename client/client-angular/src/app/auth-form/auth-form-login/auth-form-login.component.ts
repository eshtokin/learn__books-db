import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.scss']
})

export class AuthFormLoginComponent {
  public user = {
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private route: Router
  ) {}

  public async login() {
    const res: any = await this.userService.login(this.user);
    if (res.status !== 200) {
      return;
    }
    this.route.navigate(['/profile']);
    // localStorage.clear();
    // localStorage.setItem('token', res.data.token);
  }
}
