import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendRequestToGetFilteredUsersPaginationByMe } from 'src/store/filtered-users/filtered-users.actions';
import { sendRequestToAddPaginatedPostsByMe, sendRequestToGetPaginatedPostsByMe } from 'src/store/user/post/user-post.actions';
import { sendRequestToGetMyUser } from 'src/store/user/user-data/user-data.actions';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass'],
})
export class FeedComponent implements OnInit {
  private paginationLimit: number = 10;
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetMyUser());
    this.store.dispatch(
      sendRequestToGetPaginatedPostsByMe({
        limit: this.paginationLimit,
        offset: 0,
      })
    );
  }
}
