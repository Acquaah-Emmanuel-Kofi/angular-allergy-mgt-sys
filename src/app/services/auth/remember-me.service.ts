import { Injectable } from '@angular/core';

// Keys for local storage
const REMEMBER_ME_KEY = '';
const STORED_CREDENTIALS_KEY = 'storedCredentials';

@Injectable({
  providedIn: 'root',
})
export class RememberMeService {

  // Save the "Remember Me" preference to local storage
  setRememberMe(value: boolean): void {
    localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(value));
  }

  // Retrieve the "Remember Me" preference from local storage
  getRememberMe(): boolean {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY);
    return rememberMe ? JSON.parse(rememberMe) : false;
  }

  // Save user credentials to local storage
  saveCredentials(credentials: any): void {
    localStorage.setItem(STORED_CREDENTIALS_KEY, JSON.stringify(credentials));
  }

  // Retrieve stored user credentials from local storage
  getStoredCredentials(): any {
    const storedCredentials = localStorage.getItem(STORED_CREDENTIALS_KEY);
    return storedCredentials ? JSON.parse(storedCredentials) : {};
  }

    // Delete stored credentials from local storage
    deleteStoredCredentials(): void {
      localStorage.removeItem(STORED_CREDENTIALS_KEY);
    }
}
