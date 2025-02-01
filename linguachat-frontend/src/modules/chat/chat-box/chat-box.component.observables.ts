import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  map,
  merge,
  Observable,
  skipWhile,
  takeUntil,
  tap,
} from 'rxjs';
import { Message } from 'src/models/message.types';
import { UserGetDto } from 'src/models/user.types';
import { ChatService } from 'src/services/chat.service';
import { selectAllBlockedUsers } from 'src/store/user/blocked-users/blocked-users.selector';
import { selectAllConnections } from 'src/store/user/connections/connections.selector';
import {
  selectMyUser,
  selectUser,
} from 'src/store/user/user-data/user-data.selector';

@Injectable()
export class ChatBoxObservables implements OnDestroy {
  public myUserInfo: UserGetDto = new UserGetDto();

  constructor(
    private readonly store: Store,
    private readonly chatService: ChatService
  ) {}

  //ng observables

  public userData$: Observable<UserGetDto> = this.store.select(selectUser);

  public connectedUsers$: Observable<UserGetDto[]> =
    this.store.select(selectAllConnections);

  public blockedUsers$: Observable<UserGetDto[]> = this.store.select(
    selectAllBlockedUsers
  );

  //created observables

  public userNotConnected$: Observable<UserGetDto> = combineLatest([
    this.userData$,
    this.connectedUsers$,
  ]).pipe(
    skipWhile(([userData, connectedUsers]) => {
      return connectedUsers.length < 1 || userData.id === 0;
    }), 
    skipWhile(([userData, connectedUsers]) => {
      const isUserConnected: boolean = connectedUsers
        .map((user) => user.id)
        .includes(userData.id);

      return isUserConnected;
    }),
    map(([userData, connectedUsers]) => {
      const a = 1;
      return userData;
    })
  );

  public receivedMessages$: Observable<Message> = this.chatService
    .onEvent('receive-message')
    .pipe(
      tap((message) => console.log(message)),
      filter((message: Message | string): message is Message =>
        this.chatService.isMessage(message)
      ),
      filter((message: Message) => message.toId === this.myUserInfo?.id)
    );

  public sentMessages$: Observable<Message> = this.chatService
    .onEvent('sent-message')
    .pipe(
      tap((message) => {
        console.log(message);
      }),
      filter((message: Message | string): message is Message =>
        this.chatService.isMessage(message)
      )
    );

  public newMessages$ = merge(this.sentMessages$, this.receivedMessages$).pipe(
    tap((message) => {
      console.log(message);
    }),
    takeUntil(this.userNotConnected$)
  );

  private newMessagesSubscription$ = this.newMessages$.subscribe((message) => {
    //add message to ng store
  });

  private sentMessagesSubscription$ = this.sentMessages$.subscribe((message) => {
    //add message to ng store
  });

  private myDataSubscription$ = this.store
    .select(selectMyUser)
    .subscribe((user) => {
      this.myUserInfo = user;
    });

  ngOnDestroy(): void {
    this.myDataSubscription$.unsubscribe();
    this.newMessagesSubscription$.unsubscribe();
    this.sentMessagesSubscription$.unsubscribe();
  }
}
