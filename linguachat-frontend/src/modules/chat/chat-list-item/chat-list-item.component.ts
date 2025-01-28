import { Component, Input } from '@angular/core';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.sass']
})
export class ChatListItemComponent {
  @Input() user: UserGetDtoWithUserFlagKey | null = null;

  
}
