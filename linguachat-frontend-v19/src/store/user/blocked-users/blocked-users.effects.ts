import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as BlockedUsersActions from './blocked-users.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class BlockedUserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getBlockedUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockedUsersActions.sendRequestToGetBlockedUsers),
      exhaustMap((action) =>
        this.userService.getUsersWhoAreBlockedByMe().pipe(
          tap((response) => console.log('User Response:', response)),
          map((users) => {
            return BlockedUsersActions.getResponseForBlockedUsers({ users });
          }),
          catchError((error) =>
            of(BlockedUsersActions.getError({ error: error }))
          )
        )
      )
    )
  );

  addBlockedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockedUsersActions.sendRequestToAddBlockedUser),
      exhaustMap((action) =>
        this.userService.block(action.myId, action.blockedId).pipe(
          tap((response) => console.log('User Response:', response)),
          map((user) => {
            return BlockedUsersActions.getResponseForAddingBlockedUser({ user });
          }),
          catchError((error) =>
            of(BlockedUsersActions.getError({ error: error }))
          )
        )
      )
    )
  );

  removeBlockedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockedUsersActions.sendRequestToRemoveBlockedUser),
      exhaustMap((action) =>
        this.userService.unblock(action.myId, action.blockedId).pipe(
          tap((response) => console.log('User Response:', response)),
          map(() => {
            return BlockedUsersActions.getResponseForRemovingBlockedUser({ userId: action.blockedId });
          }),
          catchError((error) =>
            of(BlockedUsersActions.getError({ error: error }))
          )
        )
      )
    )
  );
}
