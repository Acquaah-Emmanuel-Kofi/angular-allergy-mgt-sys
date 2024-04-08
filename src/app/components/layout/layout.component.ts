import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToasterComponent } from '../toaster/toaster.component';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports:[ RouterLink, RouterLinkActive, ToasterComponent ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    appName = 'Aller Gus';

    
  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
    // Change the icons inside the button based on previous settings
    const colorTheme = localStorage.getItem('color-theme');
    if (colorTheme === 'dark' || (!colorTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.themeService.darkTheme = true;
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
