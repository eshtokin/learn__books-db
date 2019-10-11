import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { validatorForFormControl, getRegExpFor } from 'src/app/services/reactive-form-helper';
import UserRole from 'src/app/models/user-roles.enum';

@Component({
  selector: 'app-auth-form-reg',
  templateUrl: './auth-form-reg.component.html',
  styleUrls: ['./auth-form-reg.component.scss']
})
export class AuthFormRegComponent {
  public confPass: boolean;
  public user: User;
  public confirmPassword: string;

  public registrateForm = new FormGroup({
    email: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().email)]),
    name: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().name)]),
    password: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().password)]),
    confirmPassword: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().password)]),
    role: new FormControl([Validators.required, validatorForFormControl(getRegExpFor().role)]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.confPass = true;
    this.user = {
      email: '',
      password: '',
      name: '',
      role: UserRole.user,
      books: [],
      image: '',
      _id: ''
    };
  }

  public checkPass(): void {
    if (this.registrateForm.controls.password.value === this.registrateForm.controls.confirmPassword.value) {

      this.confPass =  true;
    } else {
      this.confPass =  false;
    }
  }

  public async registrate(): Promise<any> {
    const res: any = await this.userService.registrate(this.user);
    if (res.status === 200) {
      alert('reg success');
      this.router.navigate(['/auth/login']);
    } else {
      alert('Failed. Try again.');
    }
  }
}
