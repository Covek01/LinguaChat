import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Message } from 'src/models/message.types';
import { ChatService } from 'src/services/chat.service';
import { ChatBoxObservables } from './chat-box.component.observables';
import { ChatUtils } from '../chat.utils';
import { UserGetDto } from 'src/models/user.types';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.sass'],
  providers: [ChatBoxObservables, ChatUtils],
})
export class ChatBoxComponent {
  public messageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly chatService: ChatService,
    public chatBoxObservables: ChatBoxObservables,
    private readonly chatUtils: ChatUtils,
    private readonly router: Router
  ) {
    this.messageForm = this.fb.group({
      text: ['', [Validators.required]],
    });
  }

  public sendMessage(receiverId: number): void {
    if (!this.chatBoxObservables.myUserInfo) {
      return;
    }

    const roomName: string = this.chatUtils.getNameOfRoom(
      this.chatBoxObservables.myUserInfo.username,
      this.chatBoxObservables.userData.username
    );

    const senderId: number = this.chatBoxObservables.myUserInfo?.id ?? 0;
    const messageToSend: Message = {
      fromId: senderId,
      toId: receiverId,
      room: roomName,
      message: this.messageForm.value.text,
    };

    this.chatService.sendMessage(messageToSend);

    this.messageForm.reset();
  }

  public handleClickToViewUserProfile(user: UserGetDto): void {
    this.router.navigate([`/user`, user.id]).then(
      (nav) => {
        console.log(nav); // true if navigation is successful
      },
      (err) => {
        console.log(err); // when there's an error
      }
    );
  }
}
