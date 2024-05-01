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
import { ACCESS_TOKEN_KEY, USERID_KEY, USERNAME_KEY, } from '../../../utility/constants/auth.constants';
import { lastValueFrom, pipe } from 'rxjs';
import {environment} from '../../../../environments/environment.development'

declare const google: any;

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
    google.accounts.id.initialize({
      client_id: environment.O_AUTH,
      callback: (response: any) => this.handleCallbackResponse(response),
      
    });

    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      { 
        theme: 'outline', 
        size: 'large',
        width: '500px',
        height: '50px',
       }
    )

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

    let formData = this.form.value;

    if (this.checkFormValidity()) {
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

  checkFormValidity(): Boolean {
    if (!this.username.value || !this.password.value) {
      this.formIsValid.set(false);

      setTimeout(() => {
        this.formIsValid.set(true);
      }, 3000);

      this.errorMessage.set('Invalid credentials!');

      return false;
    }

    return true;
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

  decodeJWTToken(token: any) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }



 
  
  handleCallbackResponse(res: any){
      const response = this.decodeJWTToken(res.credential);
      localStorage.setItem(ACCESS_TOKEN_KEY, res.credential);
      localStorage.setItem(USERNAME_KEY, response.given_name)
      localStorage.setItem(USERID_KEY, response.jti)
      sessionStorage.setItem('loggedInUser',JSON.stringify(response));
      
      window.location.href = '/dashboard';
    }
    



  }


