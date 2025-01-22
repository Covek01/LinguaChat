import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, exhaustAll, exhaustMap, map, tap } from 'rxjs/operators';
import * as LoginActions from './login.actions';
import { LoginService } from 'src/services/login.service';
import { from, of } from 'rxjs';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.sendLoginRequest),
      exhaustMap((action) =>
        this.loginService
          .login(action.request.username, action.request.password)
          .pipe(
            map((response) =>
              LoginActions.getLoginResponse({ jwtToken: response.access_token })
            ),
            catchError((error) =>
              of(LoginActions.getLoginError({ error: 'Login error' }))
            )
          )
      )
    )
  );
}
