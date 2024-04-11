import { DecodedToken } from "../interfaces/decodeJwt.interface";

export function decodeJwt(token: string): DecodedToken | null {
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
