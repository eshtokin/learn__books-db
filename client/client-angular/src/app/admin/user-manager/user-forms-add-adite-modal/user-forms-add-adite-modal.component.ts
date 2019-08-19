import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { UserService } from 'src/app/service/users.service';
import { FormControleResult } from '../../../models/form-controle-result.model';

@Component({
  selector: 'app-user-forms-add-adite-modal.component',
  templateUrl: './user-forms-add-adite-modal.component.html',
  styleUrls: ['./user-forms-add-adite-modal.component.scss']
})
export class UserFormAddEditeModalComponent {

  constructor(
    public dialogRef: MatDialogRef<UserFormAddEditeModalComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  userForEdite = this.data.user || {
    name: '',
    email: '',
    role: null,
    id: '',
    password: ''
  };
  confPassword = '';
  showAddBtn = this.data.user ? false : true;

  // passwordValidator = new FormControl('', [Validators.required, this.checkPassword]);
  form = new FormGroup({
    name: new FormControl('', [Validators.required, this.checkName]),
    email: new FormControl('', [Validators.required, this.checkEmail]),
    role: new FormControl('', [Validators.required, this.checkRole]),
    password: new FormControl('', [Validators.required, this.checkPassword]),
    confirmPassword: new FormControl('', [Validators.required, this.confirmPassword])
  });

  okBtnStatus = false; // true - visible; false - hidden

  onSubmit() {
    console.log(this.form);
  }

  checkName(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{3,16}$/)) {
      return {
        result: true
      };
    }
  }

  checkEmail(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{3,16}@[\w]{1,16}.[a-z]{1,}$/)) {
      return {
        result: true
      };
    }
  }

  checkPassword(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{4,16}$/)) {
      return {
        result: true
      };
    }
  }

  confirmPassword(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{4,16}$/))  {
      return {
        result: true
      };
    }
  }

  checkRole(control: FormControl): FormControleResult {
    if (control.value !== 1 && control.value !== 2) {
      return {
        result: true
      };
    }
  }

  okAction(): void {
    this.userService.edit(this.userForEdite._id, this.userForEdite)
    .then(() => {
      this.data.reloadPage();
      this.dialogRef.close();
    });
  }

  addAction(): void {
    this.userService.registrate(this.userForEdite)
    .then(() => {
      this.data.reloadPage();
      this.dialogRef.close();
    });
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
