import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/logo/logo.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { createPasswordStrengthValidator } from '../../../utility/validators/auth/password-strength.validator';
import { checkUsernameValidator } from '../../../utility/validators/auth/username.validator';
import { confirmPasswordValidator } from '../../../utility/validators/auth/confirm-password.validator';
import { AlertComponent } from '../../../components/alert/alert.component';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { ToasterService } from '../../../components/toaster/toaster.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    LogoComponent,
    ReactiveFormsModule,
    FormsModule,
    AlertComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toast: ToasterService,
    private _authService: AuthenticationService
  ) {}

  formIsValid = signal(true);
  isLoading = signal(false);
  errorMessage = signal('');

  form = this._formBuilder.group({
    username: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          checkUsernameValidator(),
        ],
        updateOn: 'blur',
      },
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
      ],
    ],
    confirmPassword: [
      '',
      [Validators.required, confirmPasswordValidator('password')],
    ],
    agreedTermsAndConditions: [
      false,
      [Validators.required, Validators.requiredTrue],
    ],
  });

  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get confirmPassword() {
    return this.form.controls['confirmPassword'];
  }

  checkTermsAndConditions() {
    if (this.form.controls['agreedTermsAndConditions'].errors) {
      this.formIsValid.set(false);

      setTimeout(() => {
        this.formIsValid.set(true);
      }, 3000);

      this.errorMessage.set('You must agree to the terms and conditions');
      return;
    }
  }

  register() {
    this.checkTermsAndConditions();

    let formData = this.form.value;

    if (this.form.valid) {
      this.isLoading.set(true);

      this._authService.registerUser(formData).subscribe({
        next: (response) => {
          this.isLoading.set(false);

          if (response.status === 'success') {
            this.form.reset();
            this._toast.showSuccess('Account registered successfully!');
            this._router.navigate(['/login']);
          } else {
            this._toast.showError('Username already exists!');
          }
        },
        error: () => {
          this.isLoading.set(false);
          this._toast.showError(
            'Something went wrong. Please, try again!'
          );
        },
      });
    }
  }
}
