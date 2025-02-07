import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';
import { MatDialog } from '@angular/material/dialog';
import { MyprofileUpdateDialogComponent } from '../myprofile-update-dialog/myprofile-update-dialog.component';
import {
  sendRequestToUpdateMyUser,
} from 'src/store/user/user-data/user-data.actions';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { Dictionary } from '@ngrx/entity';
import { Flag } from 'src/models/models.type';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-myprofile-tab-user-info',
  templateUrl: './myprofile-tab-user-info.component.html',
  styleUrls: ['./myprofile-tab-user-info.component.sass'],
})
export class MyprofileTabUserInfoComponent implements OnDestroy {
  public user: UserGetDto = new UserGetDto();

  constructor(private readonly store: Store, private dialog: MatDialog) {}

  public userInfo$: Observable<UserGetDto> = this.store.select(selectMyUser);

  public userCountryKey$: Observable<Dictionary<Flag>> =
    this.store.select(selectFlagsEntities);

  public userWithFlagKey$: Observable<UserGetDtoWithUserFlagKey> =
    combineLatest([this.userInfo$, this.userCountryKey$]).pipe(
      map(([user, flagsDictionary]) => {
        if (flagsDictionary) {
          const userFlagKey: string = `fi-${
            flagsDictionary![user.country]?.key ?? 'aq'
          }`.toLowerCase();

          const userWithFlag: UserGetDtoWithUserFlagKey = {
            ...user,
            userFlagKey: userFlagKey,
          };

          return userWithFlag;
        } else {
          return {
            ...user,
            userFlagKey: 'fi-aq',
          };
        }
      })
    );

  private userWithFlagKeySubscription$ = this.userInfo$.subscribe((user) => {
    this.user = user;
  });

  public handleUpdateProfileDialog(): void {
    const dialogRef = this.dialog.open(MyprofileUpdateDialogComponent, {
      data: this.user,
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((updateResult) => {
      if (updateResult) {
        const updateObject = {
          ...this.user,
          ...updateResult,
        };
        this.store.dispatch(sendRequestToUpdateMyUser({ user: updateObject }));
      }
    });
  }

  public handleDeleteProfile() {}

  ngOnDestroy(): void {
    this.userWithFlagKeySubscription$.unsubscribe();
  }

}
