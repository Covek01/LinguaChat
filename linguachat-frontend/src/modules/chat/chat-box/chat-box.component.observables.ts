import { Injectable, OnDestroy } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  map,
  merge,
  Observable,
  skipWhile,
  takeUntil,
} from 'rxjs';
import { Message } from 'src/models/message.types';
import { UserGetDto } from 'src/models/user.types';
import { ChatService } from 'src/services/chat.service';
import { addMessage } from 'src/store/chat/chats.actions';
import { selectChatEntities } from 'src/store/chat/chats.selector';
import { Chat } from 'src/store/chat/chats.types';
import { selectAllBlockedUsers } from 'src/store/user/blocked-users/blocked-users.selector';
import { selectAllConnections } from 'src/store/user/connections/connections.selector';
import {
  selectMyUser,
  selectUser,
} from 'src/store/user/user-data/user-data.selector';

@Injectable()
export class ChatBoxObservables implements OnDestroy {
  public myUserInfo: UserGetDto = new UserGetDto();
  public userData: UserGetDto = new UserGetDto();

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

  public chatDictionary$: Observable<Dictionary<Chat>> =
    this.store.select(selectChatEntities);

  //created observables
  public messages$: Observable<Message[]> = combineLatest([this.userData$, this.chatDictionary$]).pipe(
    map(([userData, chatDictionary]): Message[] => {
      const chat: Chat | undefined = chatDictionary[userData.id];

      return chat?.messages ?? [];
    })
  );

  public userNotConnected$: Observable<UserGetDto> = combineLatest([
    this.userData$,
    this.connectedUsers$,
  ]).pipe(
    skipWhile(([userData, connectedUsers]) => {
      return connectedUsers.length < 1 || userData.id === 0;
    }),
    skipWhile(([userData, connectedUsers]) => {
      const isUserConnected: boolean = connectedUsers
        .map((user: UserGetDto): number => user.id)
        .includes(userData.id);

      return isUserConnected;
    }),
    map(([userData, connectedUsers]): UserGetDto => {
      return userData;
    })
  );

  public userBlocked$: Observable<UserGetDto> = combineLatest([
    this.userData$,
    this.blockedUsers$,
  ]).pipe(
    skipWhile(([userData, blockedUsers]) => {
      return blockedUsers.length < 1 || userData.id === 0;
    }),
    skipWhile(([userData, blockedUsers]) => {
      const isUserBlocked: boolean = blockedUsers
        .map((user: UserGetDto): number => user.id)
        .includes(userData.id);

      const isUserNotBlocked: boolean = !isUserBlocked;

      return isUserNotBlocked;
    }),
    map(([userData, blockedUsers]) => {
      return userData;
    })
  );

  public receivedMessages$: Observable<Message> = this.chatService
    .onEvent('receive-message')
    .pipe(
      filter((message: Message | string): message is Message =>
        this.chatService.isMessage(message)
      ),
      filter((message: Message) => message.toId === this.myUserInfo?.id)
    );

  public sentMessages$: Observable<Message> = this.chatService
    .onEvent('sent-message')
    .pipe(
      filter((message: Message | string): message is Message =>
        this.chatService.isMessage(message)
      )
    );

  public newMessages$: Observable<Message> = merge(
    this.sentMessages$,
    this.receivedMessages$
  ).pipe(takeUntil(this.userNotConnected$));

  private newMessagesSubscription$ = this.newMessages$.subscribe(
    (message: Message) => {
      const userIdToAddMessage: number =
        message.toId === this.userData.id ? message.toId : message.fromId;
      this.store.dispatch(
        addMessage({ userId: userIdToAddMessage, message: message })
      );
    }
  );

  private sentMessagesSubscription$ = this.sentMessages$.subscribe(
    (message: Message) => {
      
    }
  );

  private myDataSubscription$ = this.store
    .select(selectMyUser)
    .subscribe((user: UserGetDto) => {
      this.myUserInfo = user;
    });

  private userDataSubscription$ = this.userData$.subscribe(
    (userData: UserGetDto) => {
      this.userData = userData;
    }
  );

  ngOnDestroy(): void {
    this.myDataSubscription$.unsubscribe();
    this.newMessagesSubscription$.unsubscribe();
    this.sentMessagesSubscription$.unsubscribe();
    this.userDataSubscription$.unsubscribe();
  }
}
