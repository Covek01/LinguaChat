import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { sendRequestToGetConnectedUsersByMe } from 'src/store/user/connections/connections.actions';
import { sendRequestToGetUser } from 'src/store/user/user-data/user-data.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetConnectedUsersByMe());
    this.store.dispatch(sendRequestToGetFlags());

    this.route.queryParams.subscribe((params) => {
      const userIdString = params['userId'];
      if (userIdString === undefined) {
        return;
      }

      const userId = parseInt(params['userId']);
      console.log(userId);

      this.store.dispatch(sendRequestToGetUser({id: userId}));
    });
  }
}
