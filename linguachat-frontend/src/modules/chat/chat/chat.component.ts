import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { sendRequestToGetConnectedUsersByMe } from 'src/store/user/connections/connections.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  constructor(private readonly store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetConnectedUsersByMe());
    this.store.dispatch(sendRequestToGetFlags());
  }
}
