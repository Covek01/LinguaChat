import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as FilteredUsersActions from './filtered-users.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ConnectionService } from 'src/services/connection.service';

@Injectable()
export class FilteredUsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getFilteredUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilteredUsersActions.sendRequestToGetFilteredUsers),
      exhaustMap((action) =>
        this.userService
          .getFilteredUsersByLanguage(action.userId, action.languageId)
          .pipe(
            tap((response) => console.log('User Response:', response)),
            map((users) => {
              return FilteredUsersActions.getResponseForCFilteredUsers({
                users,
              });
            }),
            catchError((error) =>
              of(FilteredUsersActions.getError({ error: error }))
            )
          )
      )
    )
  );

  getFilteredUsersByMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilteredUsersActions.sendRequestToGetFilteredUsersByMe),
      exhaustMap((action) =>
        this.userService.getFilteredUsersByLanguageByMe(action.languageId).pipe(
          tap((response) => console.log('User Response:', response)),
          map((users) => {
            return FilteredUsersActions.getResponseForCFilteredUsers({ users });
          }),
          catchError((error) =>
            of(FilteredUsersActions.getError({ error: error }))
          )
        )
      )
    )
  );
}
