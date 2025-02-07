import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserGetDto } from 'src/models/user.types';
import { selectDarkModeEnabled } from 'src/store/dark-mode/dark-mode.selector';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { sendRequestToGetBlockedUsers } from 'src/store/user/blocked-users/blocked-users.actions';
import { sendRequestToGetLanguagesLearning } from 'src/store/user/languages-learning/languages-learning.actions';
import { sendRequestToGetLanguagesNative } from 'src/store/user/languages-native/languages-native.actions';
import { sendRequestToGetPosts } from 'src/store/user/post/user-post.actions';
import {
  sendRequestToGetMyUser,
  sendRequestToGetUser,
} from 'src/store/user/user-data/user-data.actions';
import { selectUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  id: number = 0;

  constructor(private readonly store: Store, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      const currId: number = Number.parseInt(params['id']);
      this.id = currId;
      this.store.dispatch(sendRequestToGetUser({ id: this.id }));
    });
  }

  darkMode$: Observable<boolean> = this.store.select(selectDarkModeEnabled);

  userSubscription = this.store
    .select(selectUser)
    .subscribe((user: UserGetDto) => {
      const id = this.id;
      this.store.dispatch(sendRequestToGetLanguagesLearning({ id }));
      this.store.dispatch(sendRequestToGetLanguagesNative({ id }));
      this.store.dispatch(sendRequestToGetPosts({ userId: id }));
      this.store.dispatch(sendRequestToGetBlockedUsers());
    });

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    const id: number = this.id;
    this.store.dispatch(sendRequestToGetMyUser());
    this.store.dispatch(sendRequestToGetFlags());
  }
}
