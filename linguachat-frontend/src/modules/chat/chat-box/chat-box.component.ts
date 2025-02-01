import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ChatBoxObservables } from './chat-box.component.observables';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.sass'],
  providers: [ChatBoxObservables],
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  public messageForm: FormGroup;

  constructor(
    private readonly store: Store,
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly chatService: ChatService,
    public chatBoxObservables: ChatBoxObservables
  ) {
    this.messageForm = this.fb.group({
      text: ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    // Subscribe to sentMessages$ to trigger the observable
  }


  sendMessage(receiverId: number): void {
    if (!this.chatBoxObservables.myUserInfo) {
      return;
    }

    const senderId = this.chatBoxObservables.myUserInfo?.id ?? 0;
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
