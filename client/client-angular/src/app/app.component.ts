import { Component, OnInit } from '@angular/core';
import { UserInfo } from './service/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(
    private userInfo: UserInfo
  ) {}


  ngOnInit() {
  }
}
