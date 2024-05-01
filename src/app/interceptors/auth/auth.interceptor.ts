import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { DecodedToken } from '../../interfaces/decodeJwt.interface';
import { decodeJwt } from '../../utility/constants/auth.constants';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  let router = inject(Router);
  let authService = inject(AuthenticationService);
  const authToken = authService.getAccessToken();

  // If an access token is available, add it to the request headers
  if (authToken) {
    // Decode the JWT token
    let decodedToken: DecodedToken | null = decodeJwt(authToken);

    // Access the data from the payload
    if (decodedToken && decodedToken.payload) {
      const payloadData = decodedToken.payload;
      const isExpired =
        payloadData && payloadData.exp
          ? payloadData.exp < Date.now() / 1000
          : false;

      if (isExpired) {
        authService.logoutUser();
      }
    } else {
      router.navigateByUrl('/login');
    }
    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Pass the modified request to the next handler in the chain
    return next(authReq);
  }

  // If no access token is available, simply pass the original request
  return next(req);
};
