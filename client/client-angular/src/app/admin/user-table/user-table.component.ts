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
  userForEdite = {
    _id: '',
    name: '',
    email: '',
    password: '',
    role: null
  };
  okBtnStatus = false; // true - visible; false - hidden

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

  selectUser(user) {
    this.userForEdite = user;
  }

  resetUserForEdite() {
    this.userForEdite = {
      _id: '',
      name: '',
      email: '',
      password: '',
      role: null
    };
  }

  okBtn() {
    this.okBtnStatus = !this.okBtnStatus;
  }

  editeAction(user) {
    this.selectUser(user);
    this.okBtn();
  }

  okAction() {
    this.userService.edit(this.userForEdite._id, this.userForEdite);
    console.log(this.userForEdite);
    this.resetUserForEdite();
    this.okBtn();
  }

  addAction() {
    this.userService.registrate(this.userForEdite);
    this.users.push(this.userForEdite);
    this.resetUserForEdite();
  }
}
