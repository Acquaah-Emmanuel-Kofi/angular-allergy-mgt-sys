import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    // Check if password has no value then return null
    if (!password) {
      return null;
    }

    // Regex for passwordStrength validation
    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasNumeric = /[0-9]+/.test(password);
    const hasSpecialChars = /[._%+-]+/.test(password);

    // Checks if the password is valid
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChars;

    // Returns true if the password is valid
    return !passwordValid ? { passwordStrength: true } : null;
  };
}
