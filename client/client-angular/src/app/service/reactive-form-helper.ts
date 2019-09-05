import { FormControl } from '@angular/forms';
import { FormControleResult } from '../models/form-controle-result.model';

export class ReactiveFormHelper {
  constructor() {}

  public checkName(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{3,16}$/)) {
      return {
        result: true
      };
    }
  }

  public checkEmail(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{3,16}@[\w]{1,16}.[a-z]{1,}$/)) {
      return {
        result: true
      };
    }
  }

  public checkRole(control: FormControl): FormControleResult {
    if (control.value !== 1 && control.value !== 2) {
      return {
        result: true
      };
    }
  }
  public checkPassword(control: FormControl): FormControleResult {
    if (control.value.search(/^[\w]{4,16}$/)) {
      return {
        result: true
      };
    }
  }
}
