// dark-mode.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { darkModeEnable, darkModeDisable } from './dark-mode.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class DarkModeEffects {
  constructor(private actions$: Actions, private cookieService: CookieService) {}

  enableDarkMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(darkModeEnable),
      tap(() => this.cookieService.set('darkMode', 'true', undefined, '/'))
    ),
    { dispatch: false }
  );

  disableDarkMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(darkModeDisable),
      tap(() => {
        console.log("DARK MODE IS SET TO FALSE")
        this.cookieService.set('darkMode', 'false', undefined, '/')
      })
    ),
    { dispatch: false }
  );
}
