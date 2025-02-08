import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { Flag } from 'src/models/models.type';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { sendRequestToGetConnectedUsersByMe } from 'src/store/user/connections/connections.actions';
import {
  selectAllConnections,
  selectConnectionsTotal,
} from 'src/store/user/connections/connections.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-barleft',
  templateUrl: './myprofile-barleft.component.html',
  styleUrls: ['./myprofile-barleft.component.sass'],
})
export class MyprofileBarleftComponent implements OnInit {
  constructor(private readonly store: Store, private readonly router: Router) {}

  //ng observers
  public connectedUsers$: Observable<UserGetDto[]> =
    this.store.select(selectAllConnections);

  public connectedUsersLength$: Observable<number> = this.store.select(
    selectConnectionsTotal
  );

  public flagsDictionary$: Observable<Dictionary<Flag>> =
    this.store.select(selectFlagsEntities);

  public connectedUsersWithFlags$: Observable<UserGetDtoWithUserFlagKey[]> =
    combineLatest([this.connectedUsers$, this.flagsDictionary$]).pipe(
      map(([connectedUsers, flagsDictionary]): UserGetDtoWithUserFlagKey[] => {
        return this.addFlagsMapProperty(connectedUsers, flagsDictionary);
      })
    );

  public addFlagsMapProperty(
    users: UserGetDto[],
    flagsDictionary: Dictionary<Flag>
  ): UserGetDtoWithUserFlagKey[] {
    if (flagsDictionary) {
      return users.map((user: UserGetDto): UserGetDtoWithUserFlagKey => {
        const userFlagKey: string = `fi-${
          flagsDictionary![user.country]?.key ?? 'aq'
        }`.toLowerCase();

        return { ...user, userFlagKey: userFlagKey };
      });
    } else {
      return users.map((user: UserGetDto): UserGetDtoWithUserFlagKey => {
        return { ...user, userFlagKey: 'xx' };
      });
    }
  }

  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetConnectedUsersByMe());
  }

  public handleClickToViewUserProfile(user: UserGetDtoWithUserFlagKey): void {
    this.router.navigate([`/user`, user.id]).then(
      (nav) => {
        console.log(nav); // true if navigation is successful
      },
      (err) => {
        console.log(err); // when there's an error
      }
    );
  }
}
