import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/service/user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userInfo: UserInfo
  ) { }

  ngOnInit() {
  }
}
