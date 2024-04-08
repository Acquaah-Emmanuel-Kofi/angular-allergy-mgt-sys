import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(public router: Router) {}

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
