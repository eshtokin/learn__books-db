import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  user: any = {};

  ngOnInit() {
    if (localStorage.hasOwnProperty('token')) {
      this.user = jwt_decode(localStorage.getItem('token'));
    }
  }

  isAdmin() {
    if (1 === this.user.role) {
      return true;
    }
    return false;
  }
}
