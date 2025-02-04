import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Message } from 'src/models/message.types';
import { User, UserGetDto } from 'src/models/user.types';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.sass'],
})
export class MessageListComponent implements OnDestroy {
  @Input() messages: Message[] = [];
  myUser: UserGetDto = new UserGetDto();

  constructor(private readonly store: Store) {}

  myUserSubscription$ = this.store.select(selectMyUser).subscribe((user) => {
    this.myUser = user;
  });

  ngOnDestroy(): void {
    this.myUserSubscription$.unsubscribe();
  }
}
