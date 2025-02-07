import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, skip, skipWhile, zip } from 'rxjs';
import { Flag } from 'src/models/models.type';
import { UserGetDto } from 'src/models/user.types';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
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
  selector: 'app-user-profile-tab-user-info',
  templateUrl: './user-profile-tab-user-info.component.html',
  styleUrls: ['./user-profile-tab-user-info.component.sass'],
})
export class UserProfileTabUserInfoComponent implements OnDestroy, OnInit {
  public user: UserGetDto = new UserGetDto();
  public userFlagKey: string = '';

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  userInfo$: Observable<UserGetDto> = this.store.select(selectUser);

  myUserInfo$: Observable<UserGetDto> = this.store.select(selectMyUser);

  userCountryKey$: Observable<Dictionary<Flag>> =
    this.store.select(selectFlagsEntities);

  connectionsIds$: Observable<number[] | string[]> =
    this.store.select(selectConnectionsIds);

  blockedIds$: Observable<number[]> = this.store
    .select(selectBlockedUserIds)
    .pipe(
      map((ids: string[] | number[]): number[] => ids.map((id) => Number(id)))
    );

  isUserBlocked$: Observable<boolean> = combineLatest([
    this.userInfo$,
    this.blockedIds$,
  ]).pipe(
    skipWhile(([userInfo, blockedIds]) => userInfo.id === 0),
    map(([userInfo, blockedIds]) => {
      return blockedIds.includes(userInfo.id);
    })
  );

  userFlagValueSubscription$ = combineLatest([this.userInfo$, this.userCountryKey$])
    .pipe(
      map(([userInfo, flagsDictionary]) => {
        this.user = userInfo;
        const key: string = `fi-${
          flagsDictionary![this.user.country]?.key ?? ''
        }`.toLowerCase();

        return key;
      })
    )
    .subscribe((key: string) => {
      this.userFlagKey = key;
    });

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

  checkWhetherUserIsConnected(
    connectionIds: (number | string)[],
    id: number | string
  ) {
    return connectionIds.includes(id);
  }

  checkWhetherUserIsBlocked(
    blockedIds: (number | string)[],
    id: number | string
  ) {
    const flag = blockedIds.includes(id);
    return flag;
  }

  ngOnDestroy(): void {
    this.userFlagValueSubscription$.unsubscribe();
  }
}
