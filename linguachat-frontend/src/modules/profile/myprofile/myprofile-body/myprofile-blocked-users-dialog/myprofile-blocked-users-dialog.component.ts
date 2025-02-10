import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import { Flag } from 'src/models/models.type';
import {
  User,
  UserGetDto,
  UserGetDtoWithUserFlagKey,
} from 'src/models/user.types';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { sendRequestToRemoveBlockedUser } from 'src/store/user/blocked-users/blocked-users.actions';
import { selectAllBlockedUsers } from 'src/store/user/blocked-users/blocked-users.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-blocked-users-dialog',
  templateUrl: './myprofile-blocked-users-dialog.component.html',
  styleUrls: ['./myprofile-blocked-users-dialog.component.sass'],
})
export class MyprofileBlockedUsersDialogComponent {
  public myUser: UserGetDto = new UserGetDto();

  constructor(
    private readonly store: Store,
    public dialogRef: MatDialogRef<MyprofileBlockedUsersDialogComponent>
  ) {}

  public myUser$: Observable<UserGetDto> = this.store.select(selectMyUser);

  public blockedUsers$: Observable<UserGetDto[]> = this.store.select(
    selectAllBlockedUsers
  );
  public flagsDictionary$: Observable<Dictionary<Flag>> =
    this.store.select(selectFlagsEntities);

  public blockedUsersWithFlags$ = combineLatest([
    this.blockedUsers$,
    this.flagsDictionary$,
  ]).pipe(
    map(([blockedUsers, flagsDictionary]) => {
      if (flagsDictionary) {
        return blockedUsers.map(
          (user: UserGetDto): UserGetDtoWithUserFlagKey => {
            const userFlagKey: string = `fi-${
              flagsDictionary![user.country]?.key ?? 'aq'
            }`.toLowerCase();

            const userWithFlag: UserGetDtoWithUserFlagKey = {
              ...user,
              userFlagKey: userFlagKey,
            };

            return userWithFlag;
          }
        );
      } else {
        return blockedUsers.map((user) => {
          return {
            ...user,
            userFlagKey: 'fi-aq',
          };
        });
      }
    })
  );

  myUserSubscription$ = this.myUser$.subscribe((user: UserGetDto) => {
    this.myUser = user;
  });

  public onClose(): void {
    this.dialogRef.close();
  }

  public unblock(myId: number, blockedId: number): void {
    this.store.dispatch(sendRequestToRemoveBlockedUser({ myId, blockedId }));
  }
}
