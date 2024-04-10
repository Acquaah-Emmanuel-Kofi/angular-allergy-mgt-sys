import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/logo/logo.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '../../../components/alert/alert.component';
import { checkUsernameValidator } from '../../../utility/validators/auth/username.validator';
import { ToasterService } from '../../../components/toaster/toaster.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    LogoComponent,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
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
        validators: [Validators.required, checkUsernameValidator()],
        updateOn: 'blur',
      },
    ],
    password: ['', [Validators.required]],
  });

  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }

  checkFormValidity() {
    if (!this.form.valid) {
      this.formIsValid.set(false);

      setTimeout(() => {
        this.formIsValid.set(true);
      }, 3000);

      this.errorMessage.set('Invalid credentials!');
    }
  }

  login() {
    this.checkFormValidity();

    let formData = this.form.value;

    if (this.form.valid) {
      this.isLoading.set(true);

      this._authService.loginUser(formData).subscribe({
        next: (response) => {
          this.isLoading.set(false);

          if (response.status === 'success') {
            this.form.reset();
            this._toast.showSuccess('Login Sucessful!');
            this._authService.saveUsefulDetails(response);
            this._router.navigate(['/dashboard']);
          } else {
            this._toast.showError('User does not exists!');
          }
        },
        error: () => {
          this.isLoading.set(false);
          this._toast.showError(
            'Something went wrong! Please, check your internet and try again.'
          );
        },
      });
    }
  }
}
