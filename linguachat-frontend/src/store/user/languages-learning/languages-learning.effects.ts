import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as LanguagesLearningActions from './languages-learning.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ConnectionService } from 'src/services/connection.service';
import { LanguageService } from 'src/services/language.service';

@Injectable()
export class LanguagesLearningEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private languageService: LanguageService
  ) {}

  getLanguagesLearning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguagesLearningActions.sendRequestToGetLanguagesLearning),
      exhaustMap((action) =>
        this.languageService.getLanguagesUserIsLearning(action.id).pipe(
          tap((response) => console.log('Response:', response)),
          map((languages) => {
            return LanguagesLearningActions.getResponseForLanguagesLearning({
              languages,
            });
          }),
          catchError((error) =>
            of(LanguagesLearningActions.getError({ error: error }))
          )
        )
      )
    )
  );

  addLanguageLearning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguagesLearningActions.sendRequestToAddLanguageLearning),
      exhaustMap((action) =>
        this.userService
          .insertLanguageLearning(
            action.userId,
            action.languageId,
            action.level
          )
          .pipe(
            tap((response) => console.log('Response:', response)),
            map((language) => {
              return LanguagesLearningActions.getResponseToAddLanguageLearning({
                language,
              });
            }),
            catchError((error) =>
              of(LanguagesLearningActions.getError({ error: error }))
            )
          )
      )
    )
  );

  deleteLanguageLearning$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguagesLearningActions.sendRequestToDeleteLanguageLearning),
      exhaustMap((action) =>
        this.userService
          .removeLanguageLearning(action.userId, action.languageId)
          .pipe(
            tap((response) => console.log('Response:', response)),
            map(() => {
              return LanguagesLearningActions.getResponseToDeleteLanguageLearning(
                { id: action.languageId }
              );
            }),
            catchError((error) =>
              of(LanguagesLearningActions.getError({ error: error }))
            )
          )
      )
    )
  );
}
