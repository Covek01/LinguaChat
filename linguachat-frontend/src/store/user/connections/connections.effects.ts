import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/services/user.service';
import * as ConnectionsActions from './connections.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { ConnectionService } from 'src/services/connection.service';


@Injectable()
export class ConnectionsEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private connectionService: ConnectionService
  ) {}

  getUserConnections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectionsActions.sendRequestToGetConnectedUsers),
      exhaustMap((action) =>
        this.connectionService.getConnectedUsersOfUser(action.id).pipe(
          tap((response) => console.log('User Response:', response)),
          map((users) => {
            return ConnectionsActions.getResponseForConnectedUsers({ users });
          }),
          catchError((error) => of(ConnectionsActions.getError({ error: error })))
        )
      )
    )
  );

  addUserConnection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectionsActions.sendRequestToAddConnectedUser),
      exhaustMap((action) =>
        this.connectionService.addConnection(action.firstId, action.secondId).pipe(
          tap((response) => console.log('User Response:', response)),
          map((connection) => {
            return ConnectionsActions.getResponseToAddConnectedUser({ user: connection.secondUser });
          }),
          catchError((error) => of(ConnectionsActions.getError({ error: error })))
        )
      )
    )
  );

  deleteUserConnection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConnectionsActions.sendRequestToDeleteConnectedUser),
      exhaustMap((action) =>
        this.connectionService.deleteConnectionBetweenUsers(action.firstId, action.secondId).pipe(
          tap((response) => console.log('User Response:', response)),
          map((doubleIds) => {
            return ConnectionsActions.getResponseToDeleteConnectedUser({ id: doubleIds.secondId });
          }),
          catchError((error) => of(ConnectionsActions.getError({ error: error })))
        )
      )
    )
  );
}
