import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as AllLanguagesActions from './all-languages.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { LanguageService } from 'src/services/language.service';

@Injectable()
export class AllLanguagesEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private languageService: LanguageService
  ) {}

    getAllLanguages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllLanguagesActions.sendRequestToGetAllLanguages),
      exhaustMap((action) =>
        this.languageService.getLanguagesUserIsLearning(action.id).pipe(
          tap((response) => console.log('Response:', response)),
          map((languages) => {
            return AllLanguagesActions.getResponseForAllLanguages({
              languages,
            });
          }),
          catchError((error) =>
            of(AllLanguagesActions.getError({ error: error }))
          )
        )
      )
    )
  );
}
