import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import {
  sendRequestToGetFilteredUsersPaginationByMe,
  setPaginatorSize,
} from 'src/store/filtered-users/filtered-users.actions';
import {
  selectFilteredLanguageId,
} from 'src/store/filtered-users/filtered-users.selector';
import { sendRequestToAddBlockedUser } from 'src/store/user/blocked-users/blocked-users.actions';
import {
  sendRequestToAddConnectedUser,
  sendRequestToDeleteConnectedUser,
} from 'src/store/user/connections/connections.actions';
import { FilteredProfilesObservers } from './filtered-profiles.observers.component';

@Component({
  selector: 'app-filtered-profiles',
  templateUrl: './filtered-profiles.component.html',
  styleUrls: ['./filtered-profiles.component.sass'],
  providers: [FilteredProfilesObservers],
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

  constructor(
    public readonly store: Store,
    public readonly filteredProfilesObservers: FilteredProfilesObservers,
  ) {}

  ngOnDestroy(): void {
    this.paginatorSizeSubscription$.unsubscribe();
    this.filteredLanguageSubscription$.unsubscribe();
  }

  ngOnInit(): void {}


  // subscriptions
  private paginatorSizeSubscription$ =
    this.filteredProfilesObservers.paginatorSize$.subscribe((size) => {
      this.paginatorSize = size;
    });

  private filteredLanguageSubscription$ = this.store
    .select(selectFilteredLanguageId)
    .subscribe((languageId) => {
      this.selectedLanguageId = languageId;
    });

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
    this.store.dispatch(setPaginatorSize({ size: event.pageSize }));
    this.store.dispatch(
      sendRequestToGetFilteredUsersPaginationByMe({
        languageId: this.selectedLanguageId,
        limit: event.pageSize,
        offset: event.pageIndex * event.pageSize,
      })
    );
  }
}
