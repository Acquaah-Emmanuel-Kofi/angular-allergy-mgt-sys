import * as CryptoJS from 'crypto-js';
import { DecodedToken } from '../../interfaces/decodeJwt.interface';
import { environment } from '../../../environments/environment.development';

export const ACCESS_TOKEN_KEY: string = 'ALLERGY_ACCESS_KEY';
export const USERID_KEY: string = 'USER_ID';
export const USERNAME_KEY: string = 'USERNAME';


// Encrypt data using CryptoJS library
export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, environment.SECRET_KEY).toString();
}

// Decrypt data using CryptoJS library
export function decryptData(data: string): string {
  const bytes = CryptoJS.AES.decrypt(data, environment.SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function decodeJwt(token: String): DecodedToken | null {
  // Check if the token is not empty
  if (!token) {
    return null;
  }

  // Split the token into its three parts: header, payload, and signature
  const parts = token.split('.');
  if (parts.length !== 3) {
    // Invalid token format
    return null;
  }

  // Decode and parse the header, payload, and signature
  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));
  const signature = parts[2];

  // Return an object containing the decoded header, payload, and signature
  return { header, payload, signature };
}