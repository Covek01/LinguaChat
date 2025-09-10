import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  delay,
  filter,
  fromEvent,
  map,
  Observable,
  scan,
  Subscription,
  tap,
  throttleTime,
  withLatestFrom,
} from 'rxjs';
import { Message } from 'src/models/message.types';
import { User, UserGetDto } from 'src/models/user.types';
import { selectChatEntities } from 'src/store/chat/chats.selector';
import { Chat } from 'src/store/chat/chats.types';
import {
  selectMyUser,
  selectUser,
} from 'src/store/user/user-data/user-data.selector';
import { ChatUtils } from '../chat.utils';
import { sendRequestToLoadOlderMessages } from 'src/store/chat/chats.actions';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.sass'],
  providers: [ChatUtils],
})
export class MessageListComponent implements OnDestroy, AfterViewInit {
  @Input() messages: Message[] = [];
  @Input() user: UserGetDto = new UserGetDto();
  myUser: UserGetDto = new UserGetDto();
  @ViewChild('messageContainer') messageContainer!: ElementRef<HTMLDivElement>;

  constructor(
    private readonly store: Store,
    private readonly chatUtils: ChatUtils
  ) {
  }
  ngAfterViewInit(): void {
    this.loadOlderMessagesSubscription$ = fromEvent(
      this.messageContainer.nativeElement,
      'scroll'
    )
      .pipe(
        withLatestFrom(this.messageOffset$),
        throttleTime(200),
        delay(100),
        tap(([_, offset]) => {
          const scrollTop = this.messageContainer.nativeElement.scrollTop;
          console.log(scrollTop);
        }),
        filter(
          ([_, offset]) => this.messageContainer.nativeElement.scrollTop < 40 
        ),
        map(([_, offset]) => offset)
      )
      .subscribe((offset: number) => {
        if (this.myUser.username.length === 0 || this.user.username.length === 0)
          return;
  
        this.store.dispatch(
          sendRequestToLoadOlderMessages({
            connectedUserId: this.user.id,
            chatKey: this.chatUtils.getNameOfRoom(
              this.myUser.username,
              this.user.username
            ),
            limit: this.chatUtils.messagePaginationLimit,
            offset: offset,
          })
        );
      });
  }

  public userData$: Observable<UserGetDto> = this.store.select(selectUser);

  public chatDictionary$: Observable<Dictionary<Chat>> =
    this.store.select(selectChatEntities);

  public messages$: Observable<Message[]> = combineLatest([
    this.userData$,
    this.chatDictionary$,
  ]).pipe(
    map(([userData, chatDictionary]): Message[] => {
      const chat: Chat | undefined = chatDictionary[userData.id];

      return chat?.messages ?? [];
    }),
  );

  public messageOffset$ = this.messages$.pipe(
    map((messages: Message[]): number => messages.length)
  );

  public loadOlderMessagesSubscription$: Subscription | null = null;

  myUserSubscription$ = this.store.select(selectMyUser).subscribe((user) => {
    this.myUser = user;
  });

  ngOnDestroy(): void {
    this.myUserSubscription$.unsubscribe();
    this.loadOlderMessagesSubscription$?.unsubscribe();
  }
}
