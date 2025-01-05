import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendRequestToAddBlockedUser } from 'src/store/user/blocked-users/blocked-users.actions';

@Component({
  selector: 'app-blocked-user-button',
  templateUrl: './blocked-user-button.component.html',
  styleUrls: ['./blocked-user-button.component.sass'],
})
export class BlockedUserButtonComponent {
  @Input() isUserBlocked: boolean | null = false;
  @Input() blockerId: number = 0;
  @Input() blockedId: number = 0;


  constructor(private readonly store: Store) {}

  blockUser(firstId: number, secondId: number): void {
    if (this.blockerId === 0 || this.blockedId === 0){
      return;
    }
    this.store.dispatch(
      sendRequestToAddBlockedUser({ myId: firstId, blockedId: secondId })
    );
  }
}
