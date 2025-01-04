import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Flag } from 'src/models/models.type';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { sendRequestToGetConnectedUsersByMe } from 'src/store/user/connections/connections.actions';
import {
  selectAllConnections,
  selectConnectionsEntities,
  selectConnectionsState,
  selectConnectionsTotal,
} from 'src/store/user/connections/connections.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-barleft',
  templateUrl: './myprofile-barleft.component.html',
  styleUrls: ['./myprofile-barleft.component.sass'],
})
export class MyprofileBarleftComponent implements OnInit, OnDestroy {
  constructor(private readonly store: Store, private readonly router: Router) {}

  connectedUsers$ = this.store.select(selectAllConnections);
  connectedUsersLength$ = this.store.select(selectConnectionsTotal);

  flagsDictionary: Dictionary<Flag> | null = null;
  connectedUsers: UserGetDtoWithUserFlagKey[] | null = null;

  user$ = this.store.select(selectMyUser);

  connectedUsersSubscription = this.connectedUsers$.subscribe((users) => {
    this.connectedUsers = this.addFlagsMapProperty(users);
  });

  flagsDictionarySubscription = this.store
    .select(selectFlagsEntities)
    .subscribe((flags) => {
      this.flagsDictionary = flags;
      this.store.dispatch(sendRequestToGetConnectedUsersByMe());
    });

  addFlagsMapProperty(users: UserGetDto[]): UserGetDtoWithUserFlagKey[] {
    if (this.flagsDictionary) {
      return users.map((user) => {
        const userFlagKey = `fi-${
          this.flagsDictionary![user.country]?.key ?? 'xx'
        }`.toLowerCase();
        return { ...user, userFlagKey: userFlagKey };
      });
    } else {
      this.store.dispatch(sendRequestToGetFlags());
      return users.map((user) => {
        return { ...user, userFlagKey: 'xx' };
      });
    }
  }

  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetConnectedUsersByMe());
  }

  ngOnDestroy(): void {
    this.connectedUsersSubscription.unsubscribe();
  }
}
