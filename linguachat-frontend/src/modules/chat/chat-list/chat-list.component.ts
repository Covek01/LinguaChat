import { Component } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { Flag } from 'src/models/models.type';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { selectAllConnections } from 'src/store/user/connections/connections.selector';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.sass'],
})
export class ChatListComponent {
  constructor(private readonly store: Store) {}

  //flags
  connectedUsers$: Observable<UserGetDto[]> =
    this.store.select(selectAllConnections);

  flagsDictionary$: Observable<Dictionary<Flag>> =
    this.store.select(selectFlagsEntities);

  conectedUsersWithFlags$: Observable<UserGetDtoWithUserFlagKey[]> =
    combineLatest([this.connectedUsers$, this.flagsDictionary$]).pipe(
      map(([users, flagsDictionary]) => {
        return users.map((user) => {
          const userFlagKey = `fi-${
            flagsDictionary![user.country]?.key ?? 'aq'
          }`.toLowerCase();
          return { ...user, userFlagKey: userFlagKey };
        });
      })
    );



    
}
