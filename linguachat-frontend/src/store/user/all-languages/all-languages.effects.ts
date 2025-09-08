import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as AllLanguagesActions from './all-languages.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { LanguageService } from 'src/services/language.service';
import { Language } from 'src/models/language.types';

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
        this.languageService.getAllLanguages().pipe(
          tap((response) => console.log('All Language Response:', response)),
          map((languages: Language[]) => {
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

  addLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllLanguagesActions.sendRequestForLanguageInsert),
      exhaustMap((action) =>
        this.languageService.addLanguage(action.name).pipe(
          tap((response) => console.log('Language insert response:', response)),
          map((language: Language) => {
            return AllLanguagesActions.getResponseForLanguageInsert({
              language,
            });
          }),
          catchError((error) =>
            of(AllLanguagesActions.getError({ error: error }))
          )
        )
      )
    )
  );

  deleteLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllLanguagesActions.sendRequestForLanguageDelete),
      exhaustMap((action) =>
        this.languageService.deleteLanguage(action.languageId).pipe(
          tap((response) => console.log('All Language Response:', response)),
          map(() => {
            return AllLanguagesActions.getResponseForLanguageDelete({
              languageId: action.languageId,
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
