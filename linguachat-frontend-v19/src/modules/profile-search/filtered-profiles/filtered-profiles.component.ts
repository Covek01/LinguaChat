import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { Flag } from 'src/models/models.type';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';
import {
  sendRequestToGetFilteredUsersPaginationByMe,
  setPaginatorSize,
} from 'src/store/filtered-users/filtered-users.actions';
import {
  selectAllFilteredUsers,
  selectFilteredLanguageId,
  selectFilteredUsersCount,
  selectPaginatorSize,
} from 'src/store/filtered-users/filtered-users.selector';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { sendRequestToAddBlockedUser } from 'src/store/user/blocked-users/blocked-users.actions';
import { selectBlockedUserIds } from 'src/store/user/blocked-users/blocked-users.selector';
import {
  sendRequestToAddConnectedUser,
  sendRequestToDeleteConnectedUser,
} from 'src/store/user/connections/connections.actions';
import { selectConnectionsIds } from 'src/store/user/connections/connections.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-filtered-profiles',
  templateUrl: './filtered-profiles.component.html',
  styleUrls: ['./filtered-profiles.component.sass'],
})
export class FilteredProfilesComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = [
    'username',
    'born',
    'country',
    'city',
    'since',
    'actions',
  ];
  private paginatorSize: number = 10;
  private selectedLanguageId: number = 0;

  constructor(private readonly store: Store) {}

  ngOnDestroy(): void {
    this.paginatorSizeSubscription.unsubscribe();
    this.filteredLanguageSubscription.unsubscribe();
  }

  ngOnInit(): void {}

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
    .pipe(map((ids) => ids.map((id) => Number(id))));

  private blockedIds$: Observable<number[]> = this.store
    .select(selectBlockedUserIds)
    .pipe(map((ids) => ids.map((id) => Number(id))));

  filteredUsersWithFlags$: Observable<UserGetDtoWithUserFlagKey[]> =
    combineLatest([this.filteredUsers$, this.flags$]).pipe(
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
    tap((user) => {
      console.log(user);
    })
  );

  //subscriptions
  private paginatorSizeSubscription = this.paginatorSize$.subscribe((size) => {
    this.paginatorSize = size;
  });

  private filteredLanguageSubscription = this.store
    .select(selectFilteredLanguageId)
    .subscribe((languageId) => {
      this.selectedLanguageId = languageId;
    });

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

  public connectWithUser(firstId: number, secondId: number): void {
    this.store.dispatch(sendRequestToAddConnectedUser({ firstId, secondId }));
  }

  public disconnectFromUser(firstId: number, secondId: number): void {
    this.store.dispatch(
      sendRequestToDeleteConnectedUser({ firstId, secondId })
    );
  }

  public blockUser(firstId: number, secondId: number): void {
    this.store.dispatch(
      sendRequestToAddBlockedUser({ myId: firstId, blockedId: secondId })
    );
  }

  public changePage(event: PageEvent): void {
    console.log(event);
    this.store.dispatch(setPaginatorSize({ size: event.pageSize }));
    console.log(event.pageSize);
    this.store.dispatch(
      sendRequestToGetFilteredUsersPaginationByMe({
        languageId: this.selectedLanguageId,
        limit: event.pageSize,
        offset: event.pageIndex * event.pageSize,
      })
    );
  }
}
