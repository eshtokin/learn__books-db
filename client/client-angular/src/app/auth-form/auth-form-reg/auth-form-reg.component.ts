import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormControleResult } from 'src/app/models/form-controle-result.model';

@Component({
  selector: 'app-auth-form-reg',
  templateUrl: './auth-form-reg.component.html',
  styleUrls: ['./auth-form-reg.component.scss']
})
export class AuthFormRegComponent {
  public confPass = true;
  public user: User = {
    email: '',
    password: '',
    name: '',
    role: 2,
    books: [],
    image: '',
    _id: ''
  };
  public confirmPassword: string;

  public registrateForm = new FormGroup({
    email: new FormControl('', [Validators.required, this.checkEmail]),
    name: new FormControl('', [Validators.required, this.checkName]),
    password: new FormControl('', [Validators.required, this.checkPassword]),
    confirmPassword: new FormControl('', [Validators.required, this.checkPassword]),
    role: new FormControl([Validators.required, this.checkRole])
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  private checkName(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{3,16}$/)) {
      return {
        result: true
      };
    }
  }

  private checkEmail(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{3,16}@[\w]{1,16}.[a-z]{1,}$/)) {
      return {
        result: true
      };
    }
  }

  private checkPassword(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{4,16}$/)) {
      return {
        result: true
      };
    }
  }

  public checkPass(): void {
    if (this.registrateForm.controls.password.value === this.registrateForm.controls.confirmPassword.value) {

      this.confPass =  true;
    } else {
      this.confPass =  false;
    }
  }

  public checkRole(control: FormControl): FormControleResult {
    return control.value === 1 ? {result: true} : control.value === 2 ? {result: true} : {result: false} ;
  }

  public async registrate(): Promise<any> {
    const res: any = await this.userService.registrate(this.user);
    if (res.status !== 200) {
      return;
    }
    alert('reg success');
    this.router.navigate(['/auth/login']);
  }
}
