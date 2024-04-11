import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth/auth.interceptor';
import { headersInterceptor } from './interceptors/headers/headers.interceptor';
import { errorInterceptor } from './interceptors/error/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),
    provideHttpClient(
      withInterceptors([authInterceptor, headersInterceptor, errorInterceptor]),
    )
  ]
};
