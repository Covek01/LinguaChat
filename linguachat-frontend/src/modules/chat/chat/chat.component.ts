import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { interval, Observable, skip, takeUntil } from 'rxjs';
import { ChatService } from 'src/services/chat.service';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { sendRequestToGetConnectedUsersByMe } from 'src/store/user/connections/connections.actions';
import {
  sendRequestToGetMyUser,
  sendRequestToGetUser,
} from 'src/store/user/user-data/user-data.actions';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly chatService: ChatService
  ) {
    this.chatService.onEvent('joined').subscribe({
      next: (message) => {
        console.log('Joined event received:', message);
      },
      error: (err) => {
        console.error('Error in joined subscription:', err);
      },
      complete: () => {
        console.log('Joined event subscription completed');
      },
    });
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
    this.joinSubscription$.unsubscribe();
  }

  // emitEveryFiveSecs$: Observable<number> = interval(5000);

  // sendConnectionRequest$: Observable<number> = this.emitEveryFiveSecs$.pipe(
  //   takeUntil(this.chatService.onEvent('joined'))
  // );

  // //Subscriptions
  // sendConnectionRequestSubscription$ = this.sendConnectionRequest$.subscribe(
  //   (value) => {
  //     console.log('trying connection for ' + value + '. time');
  //     this.chatService.connect();
  //   }
  // );

  joinSubscription$ = this.store
    .select(selectMyUser)
    .pipe(skip(1))
    .subscribe((user) => {
      this.chatService.join(user.id);
    });

  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetMyUser());
    this.store.dispatch(sendRequestToGetConnectedUsersByMe());
    this.store.dispatch(sendRequestToGetFlags());
    this.chatService.connect();

    this.route.queryParams.subscribe((params) => {
      const userIdString = params['userId'];
      if (userIdString === undefined) {
        return;
      }

      const userId = parseInt(params['userId']);
      console.log(userId);

      this.store.dispatch(sendRequestToGetUser({ id: userId }));
    });
  }
}
