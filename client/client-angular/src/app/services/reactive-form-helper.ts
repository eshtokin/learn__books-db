import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validatorForFormControl(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return !forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

export function getRegExpFor() {
  return {
    name: /^[\w]{3,16}$/i,
    email: /^[\w]{3,16}@[\w]{1,16}\.[a-z]{2,8}$/i,
    password: /^[\w]{4,16}$/i,
    role: /^[1, 2]{1}$/
  };
}
