import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as LanguagesNativeActions from './languages-native.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ConnectionService } from 'src/services/connection.service';
import { LanguageService } from 'src/services/language.service';

@Injectable()
export class LanguagesNativeEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private languageService: LanguageService
  ) {}

  getLanguagesNative$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguagesNativeActions.sendRequestToGetLanguagesNative),
      exhaustMap((action) =>
        this.languageService.getLanguagesUserIsLearning(action.id).pipe(
          tap((response) => console.log('Response:', response)),
          map((languages) => {
            return LanguagesNativeActions.getResponseForLanguagesNative({
              languages,
            });
          }),
          catchError((error) =>
            of(LanguagesNativeActions.getError({ error: error }))
          )
        )
      )
    )
  );

  getLanguagesNativeByMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguagesNativeActions.sendRequestToGetLanguagesNativeByMe),
      exhaustMap((action) =>
        this.languageService.getNativeLanguagesForMe().pipe(
          tap((response) => console.log('Response:', response)),
          map((languages) => {
            return LanguagesNativeActions.getResponseForLanguagesNative({
              languages,
            });
          }),
          catchError((error) =>
            of(LanguagesNativeActions.getError({ error: error }))
          )
        )
      )
    )
  );

  addLanguageNative$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguagesNativeActions.sendRequestToAddLanguageNative),
      exhaustMap((action) =>
        this.userService
          .insertLanguageNative(
            action.userId,
            action.languageId,
          )
          .pipe(
            tap((response) => console.log('Response:', response)),
            map((language) => {
              return LanguagesNativeActions.getResponseToAddLanguageNative({
                language,
              });
            }),
            catchError((error) =>
              of(LanguagesNativeActions.getError({ error: error }))
            )
          )
      )
    )
  );

  deleteLanguageLearning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguagesNativeActions.sendRequestToDeleteLanguageNative),
      exhaustMap((action) =>
        this.userService
          .removeLanguageNative(action.userId, action.languageId)
          .pipe(
            tap((response) => console.log('Response:', response)),
            map(() => {
              return LanguagesNativeActions.getResponseToDeleteLanguageNative(
                { id: action.languageId }
              );
            }),
            catchError((error) =>
              of(LanguagesNativeActions.getError({ error: error }))
            )
          )
      )
    )
  );
}
