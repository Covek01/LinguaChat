import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  skip,
  skipWhile,
  take,
  zip,
} from 'rxjs';
import { UserGetDto } from 'src/models/user.types';
import { ChatService } from 'src/services/chat.service';
import { sendRequestToGetChat } from 'src/store/chat/chats.actions';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';
import { sendRequestToGetBlockedUsers } from 'src/store/user/blocked-users/blocked-users.actions';
import { sendRequestToGetConnectedUsersByMe } from 'src/store/user/connections/connections.actions';
import {
  selectAllConnections,
} from 'src/store/user/connections/connections.selector';
import {
  sendRequestToGetMyUser,
  sendRequestToGetUser,
} from 'src/store/user/user-data/user-data.actions';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';
import { ChatUtils } from '../chat.utils';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
  providers: [ChatUtils],
})
export class ChatComponent implements OnInit, OnDestroy {
  private messagePaginationLimit: number = 10;

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly chatService: ChatService,
    private readonly chatUtils: ChatUtils
  ) {}

  ngOnDestroy(): void {
    this.chatService.disconnect();
    this.myUserSubscription$.unsubscribe();
    this.joinSubscription$.unsubscribe();
    this.getChatsSubscription$.unsubscribe();
  }

  //ng
  connectedUsers$: Observable<UserGetDto[]> = this.store.select(selectAllConnections).pipe(
    skipWhile((connectedUsers: UserGetDto[]) => {
      return connectedUsers.length === 0;
    })
  );

  myUser$: Observable<UserGetDto> = this.store.select(selectMyUser).pipe(
    skipWhile((user: UserGetDto) => {
      return user.id === 0;
    })
  );

  //subscriptions
  getChatsSubscription$ = zip([this.connectedUsers$, this.myUser$])
    .pipe(take(1))
    .subscribe(([connectedUsers, myUser]) => {
      connectedUsers.forEach((connectedUser: UserGetDto) => {
        const chatKey: string = this.chatUtils.getNameOfRoom(
          myUser.username,
          connectedUser.username
        );

        this.store.dispatch(
          sendRequestToGetChat({
            connectedUserId: connectedUser.id,
            chatKey: chatKey,
            limit: this.messagePaginationLimit,
            offset: 0,
          })
        );
      });
    });

  myUserSubscription$ = this.store
    .select(selectMyUser)
    .pipe(skip(1))
    .subscribe((user: UserGetDto) => {
      this.chatService.join(user.id);
    });

  joinSubscription$ = this.chatService.onEvent('joined').subscribe({
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

  //functions
  ngOnInit(): void {
    this.store.dispatch(sendRequestToGetMyUser());
    this.store.dispatch(sendRequestToGetConnectedUsersByMe());
    this.store.dispatch(sendRequestToGetBlockedUsers());
    this.store.dispatch(sendRequestToGetFlags());

    this.chatService.connect();

    this.route.queryParams.subscribe((params) => {
      const userIdString = params['userId'];
      if (userIdString === undefined) {
        return;
      }

      const userId: number = parseInt(params['userId']);

      this.store.dispatch(sendRequestToGetUser({ id: userId }));
    });
  }
}
