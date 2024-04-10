import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const confirmPassword = control.parent?.get(passwordControlName)?.value;

    // Check if password and confirmPassword match
    return password === confirmPassword ? null : { confirmPasswordMismatch: true };
  };
}
