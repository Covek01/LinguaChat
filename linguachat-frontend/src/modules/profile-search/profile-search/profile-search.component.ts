import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { sendRequestToGetConnectedUsers, sendRequestToGetConnectedUsersByMe } from 'src/store/user/connections/connections.actions';
import { sendRequestToGetLanguagesLearning, sendRequestToGetMyLanguagesLearning } from 'src/store/user/languages-learning/languages-learning.actions';
import { sendRequestToGetMyUser } from 'src/store/user/user-data/user-data.actions';

@Component({
  selector: 'app-profile-search',
  templateUrl: './profile-search.component.html',
  styleUrls: ['./profile-search.component.sass']
})
export class ProfileSearchComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetMyUser());
    this.store.dispatch(sendRequestToGetConnectedUsersByMe());
    this.store.dispatch(sendRequestToGetMyLanguagesLearning());
    this.store.dispatch(sendRequestToGetFlags());
  }

}
