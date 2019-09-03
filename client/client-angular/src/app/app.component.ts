import { Component, OnInit } from '@angular/core';
import { UserInfo } from './service/user-info.service';
import { UserService } from './service/users.service';
import { User } from './models/user.model';
import { FavoriteService } from './service/favorite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public user: User;

  constructor(
    private userInfo: UserInfo,
    // private favoriteService: FavoriteService
  ) {}


  ngOnInit() {
  }
}
