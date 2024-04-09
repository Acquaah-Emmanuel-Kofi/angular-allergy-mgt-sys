import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function checkUsernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const username = control.value;

        // Check if password has no value then return null
        if (!username) {
            return null;
        }

        // Regex for username validation
        if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(username)) {
            return { 'invalidUsernameFormat': true };
        }

        return null;
    }
}