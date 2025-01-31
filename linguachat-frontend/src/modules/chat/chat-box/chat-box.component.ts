import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, merge, Observable, tap } from 'rxjs';
import { Message } from 'src/models/message.types';
import { User, UserGetDto } from 'src/models/user.types';
import { ChatService } from 'src/services/chat.service';
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

  userData$: Observable<UserGetDto> = this.store.select(selectUser);

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
      tap((message) => {
        console.log(message);
      }),
      filter((message: Message | string): message is Message =>
        this.chatService.isMessage(message)
      )
    );

  newMessages$ = merge([this.sentMessages$, this.receivedMessages$]).pipe(
    tap((message) => {
      console.log(message);
    })
  );

  myDataSubscription$ = this.store.select(selectMyUser).subscribe((user) => {
    this.myUserInfo = user;
  });

  ngOnDestroy(): void {
    this.myDataSubscription$.unsubscribe();
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
