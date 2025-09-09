import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isNavigatingToLogin = false; // Prevent multiple navigations
  private loginRequestUrl = 'http://localhost:3000/auth/login';
  private registerRequestUrl = 'http://localhost:3000/auth/register';
  private getCountriesRequestUrl = `assets/data/flags-nicknames.json`;


  constructor(
    private cookieService: CookieService,
    private readonly router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwtToken = this.cookieService.get('access_token');

    if (
      !jwtToken &&
      request.url !== this.loginRequestUrl &&
      request.url !== this.registerRequestUrl &&
      request.url !== this.getCountriesRequestUrl &&
      !this.isNavigatingToLogin
    ) {
      this.isNavigatingToLogin = true;
      this.router.navigate(['/auth/login']).then(
        (nav) => {
          console.log(nav); // true if navigation is successful
          this.isNavigatingToLogin = false;
        },
        (err) => {
          console.log(err); // when there's an error
          this.isNavigatingToLogin = false;
        }
      );

      return EMPTY;
    }

    if (jwtToken && jwtToken !== '') {
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${jwtToken}` },
        withCredentials: true,
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }

  isAuthenticated(): boolean {
    const jwtToken = this.cookieService.get('access_token');

    if (jwtToken) {
      return true;
    } else {
      return false;
    }
  }
}
