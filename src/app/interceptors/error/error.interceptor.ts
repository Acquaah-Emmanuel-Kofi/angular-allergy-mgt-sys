import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle the error here
      console.error('HTTP error occurred:', error);
      // You can throw a custom error here or handle different error scenarios based on the status code
      return throwError(
        () => new Error('HTTP error occurred. Customized Error')
      );
    })
  );
};
