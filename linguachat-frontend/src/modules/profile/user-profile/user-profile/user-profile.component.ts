import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDarkModeEnabled } from 'src/store/dark-mode/dark-mode.selector';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { sendRequestToGetBlockedUsers } from 'src/store/user/blocked-users/blocked-users.actions';
import { sendRequestToGetLanguagesLearning } from 'src/store/user/languages-learning/languages-learning.actions';
import {
  sendRequestToGetLanguagesNative,
  sendRequestToGetLanguagesNativeByMe,
} from 'src/store/user/languages-native/languages-native.actions';
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
  darkMode$ = this.store.select(selectDarkModeEnabled);

  constructor(private readonly store: Store, route: ActivatedRoute) {
    this.id = Number.parseInt(route.snapshot.paramMap.get('id') ?? '0');
  }

  userSubscription = this.store.select(selectUser).subscribe((user) => {
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
    console.log(this.id);
    const id = this.id;
    this.store.dispatch(sendRequestToGetMyUser());
    this.store.dispatch(sendRequestToGetUser({ id }));
    this.store.dispatch(sendRequestToGetFlags());
  }
}
