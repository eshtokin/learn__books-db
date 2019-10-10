import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/users.service';
import { FormControleResult } from '../../../models/form-controle-result.model';
import { User } from '../../../models/user.model';
import { validatorForFormControl, getRegExpFor } from 'src/app/services/reactive-form-helper';

export enum UserRole {
  admin,
  user
}

@Component({
  selector: 'app-user-forms-add-edite-modal.component',
  templateUrl: './user-forms-add-edite-modal.component.html',
  styleUrls: ['./user-forms-add-edite-modal.component.scss']
})
export class UserFormAddEditeModalComponent {
  public confPass = true;
  public userForEdite: User = this.data.user || {
    name: '',
    email: '',
    role: 2,
    id: '',
    password: '',
    _id: ''
  };

  public confPassword = '';
  public showAddBtn: boolean = this.data.user ? false : true;

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().email)]),
    name: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().name)]),
    password: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().password)]),
    confirmPassword: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().password)]),
    role: new FormControl([Validators.required, validatorForFormControl(getRegExpFor().role)]),
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

  public checkPassword(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{4,16}$/)) {
      return {
        result: true
      };
    }
  }

  public checkPass(): void {
    if (this.form.controls.password.value === this.form.controls.confirmPassword.value) {
      this.confPass =  true;
    } else {
      this.confPass =  false;
    }
  }

  public okAction(): void {
    if (this.form.value.password.length && this.data.user.password !== this.form.value.password) {
      this.data.user.password = this.form.value.password;
    }
    this.userService.edit(this.userForEdite._id, this.userForEdite)
    .then(() => {
      this.data.reloadPage();
      this.dialogRef.close();
    });
  }

  public addAction(): void {
    this.userService.registrate(this.userForEdite)
    .then(() => {
      this.data.reloadPage();
      this.dialogRef.close();
    });
  }
}
