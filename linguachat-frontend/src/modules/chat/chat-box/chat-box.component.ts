import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  map,
  merge,
  Observable,
  pluck,
  skipWhile,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { Message } from 'src/models/message.types';
import { User, UserGetDto } from 'src/models/user.types';
import { ChatService } from 'src/services/chat.service';
import { selectAllBlockedUsers } from 'src/store/user/blocked-users/blocked-users.selector';
import { selectAllConnections } from 'src/store/user/connections/connections.selector';
import {
  selectMyUser,
  selectUser,
} from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.sass'],
})
export class ChatBoxComponent implements OnDestroy {
  public messageForm: FormGroup;
  public myUserInfo: UserGetDto = new UserGetDto();

  constructor(
    private readonly store: Store,
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly chatService: ChatService
  ) {
    this.messageForm = this.fb.group({
      text: ['', [Validators.required]],
    });
  }

  //ng observables

  userData$: Observable<UserGetDto> = this.store.select(selectUser);

  connectedUsers$: Observable<UserGetDto[]> =
    this.store.select(selectAllConnections);

  blockedUsers$: Observable<UserGetDto[]> = this.store.select(
    selectAllBlockedUsers
  );

  //created observables
  
  userNotConnected$: Observable<UserGetDto> = combineLatest([
    this.userData$,
    this.connectedUsers$,
  ]).pipe(
    skipWhile(([userData, connectedUsers]) => {
      const isUserConnected: boolean = connectedUsers
        .map((user) => user.id)
        .includes(userData.id);

      return isUserConnected;
    }),
    map(([userData, connectedUsers]) => userData)
  );

  receivedMessages$: Observable<Message> = this.chatService
    .onEvent('receive-message')
    .pipe(
      filter((message: Message | string): message is Message =>
        this.chatService.isMessage(message)
      ),
      filter((message: Message) => message.toId === this.myUserInfo?.id)
    );

  sentMessages$: Observable<Message> = this.chatService
    .onEvent('sent-message')
    .pipe(
      filter((message: Message | string): message is Message =>
        this.chatService.isMessage(message)
      )
    );

  newMessages$ = merge(this.sentMessages$, this.receivedMessages$).pipe(
    tap((message) => {
      console.log(message);
    }),
    takeUntil(this.userNotConnected$)
  );

  newMessagesSubscription$ = this.newMessages$.subscribe((message) => {
    //add message to ng store
  });

  myDataSubscription$ = this.store.select(selectMyUser).subscribe((user) => {
    this.myUserInfo = user;
  });

  ngOnDestroy(): void {
    this.myDataSubscription$.unsubscribe();
    this.newMessagesSubscription$.unsubscribe();
  }

  sendMessage(receiverId: number): void {
    if (!this.myUserInfo) {
      return;
    }

    const senderId = this.myUserInfo?.id ?? 0;
    const messageToSend: Message = {
      fromId: senderId,
      toId: receiverId,
      room: '',
      message: this.messageForm.value.text,
    };

    this.chatService.sendMessage(messageToSend);

    this.messageForm.reset();
  }
}
