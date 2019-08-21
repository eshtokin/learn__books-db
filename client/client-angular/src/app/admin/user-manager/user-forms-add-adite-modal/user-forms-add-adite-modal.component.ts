import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../service/users.service';
import { FormControleResult } from '../../../models/form-controle-result.model';
import { User } from '../../../models/user.model';

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
  public userForEdite: User = this.data.user || {
    name: '',
    email: '',
    role: null,
    id: '',
    password: '',
    _id: this.data.user._id
  };

  public confPassword = '';
  public showAddBtn: boolean = this.data.user ? false : true;

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, this.checkName]),
    email: new FormControl('', [Validators.required, this.checkEmail]),
    role: new FormControl('', [Validators.required, this.checkRole]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]) // this.checkPassword
  });

  public okBtnStatus = false; // true - visible; false - hidden

  constructor(
    public dialogRef: MatDialogRef<UserFormAddEditeModalComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User,
      reloadPage: () => void
    }
  ) {}

  onSubmit(): void {
    console.log(this.form);
    console.log(this.data);
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
    // if (control.value) {
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}
