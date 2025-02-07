import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { TaskbarModule } from '../shared/taskbar/taskbar.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { ChatListItemComponent } from './chat-list-item/chat-list-item.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MessageListComponent } from './message-list/message-list.component';
import { MyMessageComponent } from './my-message/my-message.component';
import { NotMyMessageComponent } from './not-my-message/not-my-message.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [ChatComponent, ChatListComponent, ChatBoxComponent, ChatListItemComponent, MessageListComponent, MyMessageComponent, NotMyMessageComponent],
  imports: [
    CommonModule,
    TaskbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatBadgeModule,
  ],

})
export class ChatModule {}
