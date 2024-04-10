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
import { ToasterService } from '../../../components/toaster/toaster.service';
import { confirmPasswordValidator } from '../../../utility/validators/auth/confirm-password.validator';
import { AlertComponent } from '../../../components/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, LogoComponent, ReactiveFormsModule, FormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToasterService
  ) {}

  formIsValid = signal(true);
  isLoading = signal(false);
  errorMessage = signal("");

  form = this.formBuilder.group({
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
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
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
    confirmPassword: ['', [Validators.required, confirmPasswordValidator('password')]],
    agreedTermsAndConditions: [
      false,
      [Validators.required, Validators.requiredTrue],
    ],
  });

  get username() {
    return this.form.controls['username'];
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get confirmPassword() {
    return this.form.controls['confirmPassword'];
  }

  register() {
    this.formIsValid.set(false);
    this.errorMessage.set("The form is not valid. Please correct the errors in the form before submitting");
    this.isLoading.set(true);
    console.log(this.form.value);
  }
}
