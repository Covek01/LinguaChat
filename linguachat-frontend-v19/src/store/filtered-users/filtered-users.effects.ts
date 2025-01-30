import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as FilteredUsersActions from './filtered-users.actions';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { ConnectionService } from 'src/services/connection.service';

@Injectable()
export class FilteredUsersEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getFilteredUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilteredUsersActions.sendRequestToGetFilteredUsers),
      switchMap((action) =>
        this.userService
          .getFilteredUsersByLanguage(action.userId, action.languageId)
          .pipe(
            tap((response) => console.log('User Response:', response)),
            map((users) => {
              return FilteredUsersActions.getResponseForFilteredUsers({
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

  getFilteredUsersCountByme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilteredUsersActions.sendRequestToGetCountByMe),
      switchMap((action) =>
        this.userService
          .getFilteredUsersByLanguageCountByMe(action.languageId)
          .pipe(
            tap((response) => console.log('User Response:', response)),
            map((count) => {
              return FilteredUsersActions.getResponseForGettingCount({
                count,
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
      switchMap((action) =>
        this.userService.getFilteredUsersByLanguageByMe(action.languageId).pipe(
          tap((response) => console.log('User Response:', response)),
          map((users) => {
            return FilteredUsersActions.getResponseForFilteredUsers({ users });
          }),
          catchError((error) =>
            of(FilteredUsersActions.getError({ error: error }))
          )
        )
      )
    )
  );

  getFilteredUsersPaginationByMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilteredUsersActions.sendRequestToGetFilteredUsersPaginationByMe),
      switchMap((action) =>
        this.userService
          .getFilteredUsersByLanguagePaginationByMe(
            action.languageId,
            action.limit,
            action.offset
          )
          .pipe(
            tap((response) => console.log('User Response:', response)),
            map((users) => {
              return FilteredUsersActions.getResponseForFilteredUsers({
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
}
