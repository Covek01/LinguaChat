import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';



@NgModule({
  declarations: [
    ChatComponent,
    ChatListComponent,
    ChatBoxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChatModule { }
