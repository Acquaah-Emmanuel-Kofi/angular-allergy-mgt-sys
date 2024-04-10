import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/logo/logo.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, LogoComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(public router: Router, private formBuilder: FormBuilder) {}

  isLoading = signal(false);

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
    this.isLoading.set(true);
    console.log(this.form.value);

    // this.router.navigate(['/dashboard']);
  }
}
