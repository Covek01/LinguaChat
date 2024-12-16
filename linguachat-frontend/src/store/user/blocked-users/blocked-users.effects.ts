import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as BlockedUsersActions from './blocked-users.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class UserDataEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getMyUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockedUsersActions.sendRequestToGetBlockedUsers),
      exhaustMap((action) =>
        this.userService.getUsersWhoAreBlockedByUser(action.id).pipe(
          tap((response) => console.log('User Response:', response)),
          map((users) => {
            return BlockedUsersActions.getResponseForBlockedUsers({ users });
          }),
          catchError((error) => of(BlockedUsersActions.getError({ error: error })))
        )
      )
    )
  );
}
