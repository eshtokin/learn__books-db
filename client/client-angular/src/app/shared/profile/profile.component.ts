import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users.service';
import * as jwt_decode from 'jwt-decode';
import { UserInfo } from 'src/app/service/user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private userInfo: UserInfo
  ) { }

  ngOnInit() {
  }
}
