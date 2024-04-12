import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { LogoComponent } from '../../shared/logo/logo.component';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports:[ LogoComponent ,RouterLink, RouterLinkActive ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    appName = 'Aller Gus';

    
  constructor(public _themeService: ThemeService, private _authService: AuthenticationService) { }

  ngOnInit(): void {
    const colorTheme = localStorage.getItem('color-theme');
    if(colorTheme === 'dark' || (!colorTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.toggle('dark', true);
      this.toggleTheme();
    }
  }

  toggleTheme() {
    this._themeService.toggleTheme();
  }

  logOutUser() {
    this._authService.logoutUser();
  }
}
