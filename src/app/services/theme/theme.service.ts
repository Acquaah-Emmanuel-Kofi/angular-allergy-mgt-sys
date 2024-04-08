import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkTheme: boolean = false;

  constructor() { }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    localStorage.setItem('color-theme', this.darkTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', this.darkTheme);
  }
}
