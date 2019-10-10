import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormControleResult } from 'src/app/models/form-controle-result.model';
import { ReactiveFormHelper } from 'src/app/services/reactive-form-helper';

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
    email: new FormControl('', [Validators.required, this.formHelper.checkEmail]),
    name: new FormControl('', [Validators.required, this.formHelper.checkName]),
    password: new FormControl('', [Validators.required, this.formHelper.checkPassword]),
    confirmPassword: new FormControl('', [Validators.required, this.formHelper.checkPassword]),
    role: new FormControl([Validators.required, this.checkRole])
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private formHelper: ReactiveFormHelper
  ) {
    this.confPass = true;
    this.user = {
      email: '',
      password: '',
      name: '',
      role: 2,
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
// move to helper
  public checkRole(control: FormControl): FormControleResult {
    return control.value === 1 ? {result: true} : control.value === 2 ? {result: true} : {result: false} ;
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
