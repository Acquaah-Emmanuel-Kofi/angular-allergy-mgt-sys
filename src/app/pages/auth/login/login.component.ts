import { Component, OnInit, signal } from '@angular/core';
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
import { ToasterService } from '../../../components/toaster/services/toaster.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { RememberMeService } from '../../../services/auth/remember-me.service';

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
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toast: ToasterService,
    private _authService: AuthenticationService,
    private _rememberMeService: RememberMeService
  ) {}

  ngOnInit() {
    this.retrieveStoredCredentials();
  }

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
    rememberMe: [this._rememberMeService.getRememberMe()],
  });

  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }

  get rememberMe() {
    return this.form.controls['rememberMe'];
  }

  login() {
    this.checkFormValidity();

    let formData = this.form.value;

    if (this.username.value && this.password.value) {
      this.isLoading.set(true);

      this._authService.loginUser(formData).subscribe({
        next: (response) => {
          this.isLoading.set(false);

          this.handleRememberMeChange(this.rememberMe.value);

          if (response.status === 'success') {
            this._authService.saveToken(response.token);
            this.form.reset();
            this._toast.showSuccess('Login Sucessful!');
            this._router.navigate(['/dashboard']);
          } else if (response.status === 'error') {
            this._toast.showError('User does not exists!');
          } else {
            this._toast.showError("Incorrect username or password.");
          }
        },
        error: () => {
          this.isLoading.set(false);
          this._toast.showError(
            'Something went wrong. Please, check your internet connection and try again!'
          );
        },
      });
    }
  }

  checkFormValidity() {
    if (!this.username.value || !this.password.value) {
      this.formIsValid.set(false);

      setTimeout(() => {
        this.formIsValid.set(true);
      }, 3000);

      this.errorMessage.set('Invalid credentials!');
    }
  }

  handleRememberMeChange(rememberMeValue: any): void {
    if (!rememberMeValue) {
      this._rememberMeService.deleteStoredCredentials();
    } else {
      this._rememberMeService.saveCredentials(this.form.value);
    }
  }

  // Retrieve stored credentials and set them in the form
  retrieveStoredCredentials() {
    const storedCredentials = this._rememberMeService.getStoredCredentials();
    if (storedCredentials) {
      this.form.patchValue(storedCredentials);
    }

    // Check if the 'rememberMe' control exists before subscribing to changes
    const rememberMeControl = this.form.controls['rememberMe'];

    if (rememberMeControl) {
      rememberMeControl.valueChanges.subscribe((value) => {
        if (value !== null) {
          this._rememberMeService.setRememberMe(value);
        }
      });
    }
  }
}
