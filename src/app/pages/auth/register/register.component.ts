import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../../shared/logo/logo.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
