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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, LogoComponent, FormsModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public router: Router, private formBuilder: FormBuilder) {}

  formIsValid = signal(true);
  isLoading = signal(false);
  errorMessage = signal("");

  form = this.formBuilder.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      },
    ],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  login() {
    this.formIsValid.set(false);
    this.errorMessage.set("Invalid Credentials");
    this.isLoading.set(true);
    console.log(this.form.value);

    // this.router.navigate(['/dashboard']);
  }
}
