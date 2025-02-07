import { Injectable } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { Flag } from 'src/models/models.type';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';
import {
  selectAllFilteredUsers,
  selectFilteredUsersCount,
  selectPaginatorSize,
} from 'src/store/filtered-users/filtered-users.selector';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { selectBlockedUserIds } from 'src/store/user/blocked-users/blocked-users.selector';
import { selectConnectionsIds } from 'src/store/user/connections/connections.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Injectable()
export class FilteredProfilesObservers {
  constructor(private readonly store: Store) {}

  //Observables
  public flags$: Observable<Dictionary<Flag>> =
    this.store.select(selectFlagsEntities);
  public myUserInfo$: Observable<UserGetDto> = this.store.select(selectMyUser);
  public filteredUsers$: Observable<UserGetDto[]> = this.store.select(
    selectAllFilteredUsers
  );

  public paginatorSize$: Observable<number> =
    this.store.select(selectPaginatorSize);

  public filteredUsersCount$: Observable<number> = this.store.select(
    selectFilteredUsersCount
  );

  private connectionsIds$: Observable<number[]> = this.store
    .select(selectConnectionsIds)
    .pipe(
      map((ids: string[] | number[]): number[] =>
        ids.map((id: string | number): number => Number(id))
      )
    );

  private blockedIds$: Observable<number[]> = this.store
    .select(selectBlockedUserIds)
    .pipe(
      map((ids: string[] | number[]): number[] =>
        ids.map((id: number | string): number => Number(id))
      )
    );

  public filteredUsersWithFlags$: Observable<UserGetDtoWithUserFlagKey[]> =
    combineLatest([this.filteredUsers$, this.flags$]).pipe(
      map(([filteredUsers, flags]): UserGetDtoWithUserFlagKey[] => {
        return this.addFlagsMapProperty(filteredUsers, flags);
      })
    );

  public filteredUsersWithExtendedInfo$ = combineLatest([
    this.myUserInfo$,
    this.filteredUsersWithFlags$,
    this.blockedIds$,
    this.connectionsIds$,
  ]).pipe(
    map(([myUserInfo, filteredUsersWithFlags, blockedIds, connectionIds]) => {
      return filteredUsersWithFlags.map((user: UserGetDto) => {
        return {
          ...user,
          blocked: blockedIds.includes(user.id),
          connected: connectionIds.includes(user.id),
        };
      });
    }),
    
  );

  public addFlagsMapProperty(
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
}
