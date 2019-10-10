import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isUserAuth;
  public userRole;
  constructor(
    private userInfo: UserInfo
    ) {
      // Return true if user have token from the server in another case return false
      this.isUserAuth = this.userInfo.isUserAuth;

      // Return true if user have status Admin
      this.userRole = this.userInfo.getStatus;
    }

  ngOnInit() {
  }
}
