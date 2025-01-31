import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.sass'],
})
export class ChatListItemComponent {
  constructor(private readonly router: Router) {}

  @Input() user: UserGetDtoWithUserFlagKey | null = null;

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
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
