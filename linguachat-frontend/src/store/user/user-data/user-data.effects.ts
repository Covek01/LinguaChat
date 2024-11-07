import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as UserDataActions from './user-data.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class UserDataEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getMyUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDataActions.sendRequestToGetMyUser),
      exhaustMap((action) =>
        this.userService.myprofile().pipe(
          tap((response) => console.log('User Response:', response)),
          map((user) => {
            return UserDataActions.getResponseForMyUser({ user });
          }),
          catchError((error) => of(UserDataActions.getError({ error: error })))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDataActions.sendRequestToGetUser),
      exhaustMap((action) =>
        this.userService.get(action.id).pipe(
          tap((response) => console.log('User Response:', response)),
          map((user) => {
            return UserDataActions.getResponse({ user });
          }),
          catchError((error) => of(UserDataActions.getError({ error: error })))
        )
      )
    )
  );
}
