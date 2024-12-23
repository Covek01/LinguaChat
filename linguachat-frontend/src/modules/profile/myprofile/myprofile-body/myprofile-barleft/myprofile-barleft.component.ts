import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { sendRequestToGetConnectedUsers } from 'src/store/user/connections/connections.actions';
import { selectConnectionsEntities, selectConnectionsState } from 'src/store/user/connections/connections.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-barleft',
  templateUrl: './myprofile-barleft.component.html',
  styleUrls: ['./myprofile-barleft.component.sass'],
})
export class MyprofileBarleftComponent implements OnInit {
  constructor(private readonly store: Store, private readonly router: Router) {}
  connections$ = this.store.select(selectConnectionsState);
  user$ = this.store.select(selectMyUser)
  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetConnectedUsers)
  }
}
