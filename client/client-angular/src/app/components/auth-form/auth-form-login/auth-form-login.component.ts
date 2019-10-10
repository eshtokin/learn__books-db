import { Component } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.scss']
})

export class AuthFormLoginComponent {
  public user: {
    email: string,
    password: string
  };

  constructor(
    private userService: UserService,
    private route: Router
  ) {
    this.user = {
      email: '',
      password: ''
    };
  }

  public login(): void {
    this.userService.login(this.user)
    .then((data) => {
      this.route.navigate(['/profile']);
    })
    .catch(err => {
      alert('incorrect password or email');
    });
  }
}
