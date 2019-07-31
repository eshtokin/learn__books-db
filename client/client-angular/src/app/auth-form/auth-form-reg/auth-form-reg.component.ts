import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-auth-form-reg',
  templateUrl: './auth-form-reg.component.html',
  styleUrls: ['./auth-form-reg.component.scss']
})
export class AuthFormRegComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  user: User = {
    email: '',
    password: '',
    name: '',
    role: 2,
    books: [],
    image: '',
    _id: ''
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
