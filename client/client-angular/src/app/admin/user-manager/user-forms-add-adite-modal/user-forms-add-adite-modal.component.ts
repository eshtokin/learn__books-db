import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ControlContainer } from '@angular/forms';
import { UserService } from 'src/app/service/users.service';
import { FormControleResult } from '../../../models/form-controle-result.model';

export enum UserRole {
  admin,
  user
}

@Component({
  selector: 'app-user-forms-add-adite-modal.component',
  templateUrl: './user-forms-add-adite-modal.component.html',
  styleUrls: ['./user-forms-add-adite-modal.component.scss']
})
export class UserFormAddEditeModalComponent {
  public confPass = true;
  public userForEdite = this.data.user || {
    name: '',
    email: '',
    role: null,
    id: '',
    password: ''
  };

  public confPassword = '';
  public showAddBtn = this.data.user ? false : true;

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, this.checkName]),
    email: new FormControl('', [Validators.required, this.checkEmail]),
    role: new FormControl('', [Validators.required, this.checkRole]),
    password: new FormControl('', [Validators.required, this.checkPassword]),
    confirmPassword: new FormControl('', [Validators.required, this.checkPassword])
  });

  public okBtnStatus = false; // true - visible; false - hidden

  constructor(
    public dialogRef: MatDialogRef<UserFormAddEditeModalComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit(): void {
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

  checkPass() {
    if (this.form.controls.password.value === this.form.controls.confirmPassword.value) {

      this.confPass =  true;
    } else {
      this.confPass =  false;
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
