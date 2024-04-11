import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../../services/auth/authentication.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const authToken = inject(AuthenticationService).getAccessToken();

  // If an access token is available, add it to the request headers
  if (authToken) {
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
