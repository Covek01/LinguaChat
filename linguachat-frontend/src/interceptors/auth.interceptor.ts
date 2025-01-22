import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const jwtToken = localStorage.getItem('jwtToken');
    const jwtToken = this.cookieService.get('access_token');
    console.log('JWT TOKEN' + jwtToken);
    console.log(jwtToken);

    if (jwtToken) {
      const authReq = request.clone({
        setHeaders: { Authorization: `Bearer ${jwtToken}` },
        withCredentials: true,
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
