import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Flag } from 'src/models/models.type';
import {
  User,
  UserGetDto,
  UserGetDtoWithUserFlagKey,
} from 'src/models/user.types';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import {
  sendRequestToAddConnectedUser,
  sendRequestToDeleteConnectedUser,
} from 'src/store/user/connections/connections.actions';
import { selectConnectionsIds } from 'src/store/user/connections/connections.selector';
import { sendRequestToGetUser } from 'src/store/user/user-data/user-data.actions';
import {
  selectMyUser,
  selectUser,
} from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-user-profile-tab-user-info',
  templateUrl: './user-profile-tab-user-info.component.html',
  styleUrls: ['./user-profile-tab-user-info.component.sass'],
})
export class UserProfileTabUserInfoComponent implements OnDestroy {
  constructor(private readonly store: Store) {}

  user: UserGetDto = new UserGetDto();
  flagsDictionary: Dictionary<Flag> | null = null;
  userFlagKey: string = '';

  userInfo$ = this.store.select(selectUser);
  myUserInfo$ = this.store.select(selectMyUser);
  userCountryKey$ = this.store.select(selectFlagsEntities);
  connectionsIds$: Observable<number[] | string[]> =
    this.store.select(selectConnectionsIds);

  userInfoCopySubscription = this.userInfo$.subscribe((user) => {
    this.user = user;
    if (this.flagsDictionary) {
      this.userFlagKey = `fi-${
        this.flagsDictionary![this.user.country]?.key ?? ''
      }`.toLowerCase();
    } else {
      this.store.dispatch(sendRequestToGetFlags());
    }
  });

  userCountryKeySubscription = this.userCountryKey$.subscribe((flags) => {
    console.log(flags);
    this.flagsDictionary = flags;
  });

  connectWithUser(firstId: number, secondId: number): void {
    this.store.dispatch(sendRequestToAddConnectedUser({ firstId, secondId }));
  }

  disconnectFromUser(firstId: number, secondId: number): void {
    this.store.dispatch(
      sendRequestToDeleteConnectedUser({ firstId, secondId })
    );
  }

  blockUser(firstId: number, secondId: number): void {}

  checkWhetherUserIsConnected(
    connectionIds: (number | string)[],
    id: number | string
  ) {
    return connectionIds.includes(id);
  }

  ngOnDestroy(): void {
    this.userCountryKeySubscription.unsubscribe();
    this.userInfoCopySubscription.unsubscribe();
  }
}
