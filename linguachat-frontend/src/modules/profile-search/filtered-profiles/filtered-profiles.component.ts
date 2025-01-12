import { Component, OnDestroy, OnInit } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Flag } from 'src/models/models.type';
import {
  UserGetDto,
  UserGetDtoWithBlockedAndConnectedStatus,
  UserGetDtoWithUserFlagKey,
} from 'src/models/user.types';
import {
  selectAllFilteredUsers,
  selectFilteredUsersState,
} from 'src/store/filtered-users/filtered-users.selector';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { sendRequestToAddBlockedUser } from 'src/store/user/blocked-users/blocked-users.actions';
import { selectBlockedUserIds } from 'src/store/user/blocked-users/blocked-users.selector';
import {
  sendRequestToAddConnectedUser,
  sendRequestToDeleteConnectedUser,
} from 'src/store/user/connections/connections.actions';
import { selectConnectionsIds } from 'src/store/user/connections/connections.selector';
import {
  selectMyUser,
  selectUser,
} from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-filtered-profiles',
  templateUrl: './filtered-profiles.component.html',
  styleUrls: ['./filtered-profiles.component.sass'],
})
export class FilteredProfilesComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'born',
    'country',
    'city',
    'since',
    'actions',
  ];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  flags$ = this.store.select(selectFlagsEntities);
  myUserInfo$ = this.store.select(selectMyUser);

  filteredUsersWithMyUser$ = this.store.select(selectAllFilteredUsers);

  filteredUsers$ = combineLatest([
    this.filteredUsersWithMyUser$,
    this.myUserInfo$,
  ]).pipe(
    map(([users, myUser]) => {
      return users.filter((user) => user.id !== myUser.id);
    })
  );

  private connectionsIds$: Observable<number[]> = this.store
    .select(selectConnectionsIds)
    .pipe(map((ids) => ids.map((id) => Number(id))));

  private blockedIds$: Observable<number[]> = this.store
    .select(selectBlockedUserIds)
    .pipe(map((ids) => ids.map((id) => Number(id))));

  filteredUsersWithFlags$ = combineLatest([
    this.filteredUsers$,
    this.flags$,
  ]).pipe(
    map(([filteredUsers, flags]) => {
      return this.addFlagsMapProperty(filteredUsers, flags);
    })
  );

  filteredUsersWithExtendedInfo$ = combineLatest([
    this.myUserInfo$,
    this.filteredUsersWithFlags$,
    this.blockedIds$,
    this.connectionsIds$,
  ]).pipe(
    map(([myUserInfo, filteredUsersWithFlags, blockedIds, connectionIds]) => {
      return filteredUsersWithFlags.map((user) => {
        return {
          ...user,
          blocked: blockedIds.includes(user.id),
          connected: connectionIds.includes(user.id),
        };
      });
    }),
    tap(user => {

      console.log(user);
    })
  );

  addFlagsMapProperty(
    users: UserGetDto[],
    flagsDictionary: Dictionary<Flag>
  ): UserGetDtoWithUserFlagKey[] {
    if (flagsDictionary) {
      return users.map((user) => {
        const userFlagKey = `fi-${
          flagsDictionary![user.country]?.key ?? 'xx'
        }`.toLowerCase();
        return { ...user, userFlagKey: userFlagKey };
      });
    } else {
      return users.map((user) => {
        return { ...user, userFlagKey: 'xx' };
      });
    }
  }

  connectWithUser(firstId: number, secondId: number): void {
    this.store.dispatch(sendRequestToAddConnectedUser({ firstId, secondId }));
  }

  disconnectFromUser(firstId: number, secondId: number): void {
    this.store.dispatch(
      sendRequestToDeleteConnectedUser({ firstId, secondId })
    );
  }

  blockUser(firstId: number, secondId: number): void {
    this.store.dispatch(
      sendRequestToAddBlockedUser({ myId: firstId, blockedId: secondId })
    );
  }
}
