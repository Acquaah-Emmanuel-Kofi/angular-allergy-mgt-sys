import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { LogoComponent } from '../../shared/logo/logo.component';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [LogoComponent, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  appName = 'Aller Gus';

  constructor(
    public _themeService: ThemeService,
    private _authService: AuthenticationService
  ) {}

  username: string | null = null;
  email: string | null = null;

  ngOnInit(): void {
    this.fetchUserDetails();

    const colorTheme = localStorage.getItem('color-theme');
    if (
      colorTheme === 'dark' ||
      (!colorTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.toggle('dark', true);
      this.toggleTheme();
    }
  }

  fetchUserDetails() {
    this._authService.getUserProfileDetails().subscribe((details) => {
      this.username = details.username;
      this.email = details.email;
    });
  }

  toggleTheme() {
    this._themeService.toggleTheme();
  }

  logOutUser() {
    this._authService.logoutUser();
  }
}
