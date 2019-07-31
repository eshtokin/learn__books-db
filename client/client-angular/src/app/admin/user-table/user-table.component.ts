import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/users.service';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: object[];
  userForEdite: User = {
    name: '',
    email: '',
    password: '',
    role: null,
    books: [],
    image: '',
    _id: ''
  };
  okBtnStatus = false; // true - visible; false - hidden


  form = new FormGroup({
    name: new FormControl('', [Validators.required, this.checkName]),
    email: new FormControl('', [Validators.required, this.checkEmail]),
    password: new FormControl('', [Validators.required, this.checkPassword]),
    role: new FormControl('', [Validators.required, this.checkRole])
  });

  onSubmit() {
    console.warn(this.form);
  }

  checkName(control: FormControl) {
    if (control.value.search(/^[\w]{3,16}$/)) {
      return {
        '' : true
      };
    }
  }

  checkEmail(control: FormControl) {
    if (control.value.search(/^[\w]{3,16}@[\w]{3,16}.[a-z]{2,}$/)) {
      return {
        '' : true
      };
    }
  }

  checkPassword(control: FormControl) {
    if (control.value.search(/^[\w]{4,16}$/)) {
      return {'' : true};
    }
  }

  checkRole(control: FormControl) {
    if (control.value !== 1 && control.value !== 2) {
      return {'' : true};
    }
  }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.userService.getAllUsers().then(el => {
      this.users = el.data.slice();
    });
  }

  deleteUser(event): void {
    this.userService.delete(event.target.id);
    this.users = this.users.filter((el: User) => el._id !== event.target.id);
  }

  selectUser(user: User): void {
    this.userForEdite = user;
  }

  resetUserForEdite(): void {
    this.userForEdite = {
      _id: '',
      name: '',
      email: '',
      password: '',
      books: [],
      image: '',
      role: null
    };
  }

  okBtn(): void {
    this.okBtnStatus = !this.okBtnStatus;
  }

  editeAction(user: User): void {
    this.selectUser(user);
    this.okBtn();
  }

  okAction(): void {
    this.userService.edit(this.userForEdite._id, this.userForEdite);
    this.resetUserForEdite();
    this.okBtn();
  }

  addAction(): void {
    this.userService.registrate(this.userForEdite);
    this.users.push(this.userForEdite);
    this.resetUserForEdite();
  }
}
