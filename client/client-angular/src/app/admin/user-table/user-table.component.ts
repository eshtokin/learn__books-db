import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  constructor(private userService: UserService) { }

  users = [];

  ngOnInit() {
    this.init();
  }

  init() {
    this.userService.getAllUsers().then(el => {
      this.users = el.data.slice();
    });
  }

  deleteUser(event) {
    this.userService.delete(event.target.id);
    this.users = this.users.filter(el => el._id !== event.target.id);
  }
}
