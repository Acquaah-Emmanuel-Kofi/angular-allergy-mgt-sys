import * as CryptoJS from 'crypto-js';
import { DecodedToken } from '../../interfaces/decodeJwt.interface';

export const ACCESS_TOKEN_KEY: string = 'TOKEN';
export const USERID_KEY: string = 'USER_ID';
export const USERNAME_KEY: string = 'USERNAME';

const SECRET_KEY: string =
  'jdyYCUh04EBwVC50DXiak95NrCRt0NgFbOru9ejF4u7ipbySterYrpqUFMikY79ObfxlOKAxBDUHWaZO0j3tnxpNnqgNxpSjwsifUiaEZOeSPLhLr7Uv1dCfw9h7sePrCOWRZPPlkCujlhNvIyrb1PwgMC7rjUowdALVevfgSsTJYz7Dd7B3bvi4gO62nOBvZ6XXWfo838IuyYT2IiunYvXkABnlu0wkxT0K7pEKUV2R4hiCzMZVSrsA93JgLmdd';


// Encrypt data using sjcl library
export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
}

// Decrypt data using sjcl library
export function decryptData(data: string): string {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
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