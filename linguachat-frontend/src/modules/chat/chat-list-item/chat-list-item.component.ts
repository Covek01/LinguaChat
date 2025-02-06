import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  count,
  filter,
  map,
  Observable,
  skipWhile,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Message } from 'src/models/message.types';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';
import { ChatService } from 'src/services/chat.service';
import {
  selectMyUser,
  selectUser,
} from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.sass'],
})
export class ChatListItemComponent implements OnDestroy {
  public newUnseenMessages: Message[] = [];
  @Input() user: UserGetDtoWithUserFlagKey | null = null;

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private chatService: ChatService
  ) {}

  public selectedUser$: Observable<UserGetDto> = this.store
    .select(selectUser)
    .pipe(skipWhile((user) => user.id === 0));

  public newMessages$: Observable<Message> = this.chatService
    .onEvent('receive-message')
    .pipe(
      filter((message: Message | string): message is Message =>
        this.chatService.isMessage(message)
      ),
    );


  private newMessagesCountSubscription$ = this.newMessages$
    .pipe(
      withLatestFrom(this.selectedUser$),
      filter(
        ([newMessage, selectedUser]) =>
          newMessage.fromId !== selectedUser.id &&
          newMessage.fromId === this.user?.id
      ),
      tap(([selectedUser, newMessages]) => {
        // console.log('EVO ME');
        // console.log(selectedUser);
        // console.log(newMessages);
      }),
      map(([newMessage, selectedUser]): Message => {
        return newMessage;
      })
    )
    .subscribe((newMessage: Message) => {
      this.newUnseenMessages = [...this.newUnseenMessages, newMessage];
      console.log(this.newUnseenMessages);
    });

  private receivedMessageSubscription$ = this.newMessages$.subscribe(
    (value) => {}
  );

  ngOnDestroy(): void {
    this.newMessagesCountSubscription$.unsubscribe();
    this.receivedMessageSubscription$.unsubscribe();
  }

  navigateChat(userId: number): void {
    this.router
      .navigate([`/chat`], {
        queryParams: {
          userId: userId,
        },
      })
      .then(
        (nav) => {
          console.log(nav);
          this.newUnseenMessages = []
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
