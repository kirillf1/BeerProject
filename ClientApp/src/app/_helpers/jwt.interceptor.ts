import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../_services';




@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, @Inject('BASE_URL') private baseUrl: string) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.userValue;
      const isLoggedIn = currentUser && currentUser.token;
      const isApiUrl = request.url.startsWith(this.baseUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
              setHeaders: {
                Accept: "application/json",
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}
