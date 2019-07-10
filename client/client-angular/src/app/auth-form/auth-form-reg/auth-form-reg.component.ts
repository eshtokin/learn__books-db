import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form-reg',
  templateUrl: './auth-form-reg.component.html',
  styleUrls: ['./auth-form-reg.component.sass']
})
export class AuthFormRegComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  roles: number[] = [2, 1];

  user = {
    email: '',
    password: '',
    name: '',
    role: 2
  };

  async registrate() {
    const res: any = await this.userService.registrate(this.user);
    if (res.status !== 200) {
      return;
    }
    alert('reg success');
    this.router.navigate(['/auth/login']);
  }
}
