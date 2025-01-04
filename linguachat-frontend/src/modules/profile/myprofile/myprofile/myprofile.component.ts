import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { sendRequestToGetAllLanguages } from 'src/store/user/all-languages/all-languages.actions';
import { sendRequestToGetBlockedUsers } from 'src/store/user/blocked-users/blocked-users.actions';
import {
  sendRequestToGetLanguagesLearning,
  sendRequestToGetMyLanguagesLearning,
} from 'src/store/user/languages-learning/languages-learning.actions';
import { sendRequestToGetLanguagesNativeByMe } from 'src/store/user/languages-native/languages-native.actions';
import { sendRequestToGetPostsByMe } from 'src/store/user/post/user-post.actions';
import { sendRequestToGetMyUser } from 'src/store/user/user-data/user-data.actions';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.sass'],
})
export class MyprofileComponent implements OnInit {
  constructor(private readonly store: Store, private readonly router: Router) {}
  myUserInfo$ = this.store.select(selectMyUser);

  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetMyUser());
    this.store.dispatch(sendRequestToGetMyLanguagesLearning());
    this.store.dispatch(sendRequestToGetLanguagesNativeByMe());
    this.store.dispatch(sendRequestToGetBlockedUsers());
    this.store.dispatch(sendRequestToGetPostsByMe());
    this.store.dispatch(sendRequestToGetAllLanguages());
    this.store.dispatch(sendRequestToGetFlags());

  }
}
