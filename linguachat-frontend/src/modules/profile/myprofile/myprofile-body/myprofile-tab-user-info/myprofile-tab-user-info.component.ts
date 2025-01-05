import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';
import { DatePipe } from '@angular/common';
import { UserGetDto } from 'src/models/user.types';
import { MatDialog } from '@angular/material/dialog';
import { MyprofileUpdateDialogComponent } from '../myprofile-update-dialog/myprofile-update-dialog.component';
import {
  sendRequestToGetMyUser,
  sendRequestToUpdateMyUser,
} from 'src/store/user/user-data/user-data.actions';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { Dictionary } from '@ngrx/entity';
import { Flag } from 'src/models/models.type';
import { sendRequestToGetFlags } from 'src/store/flags/flags.actions';

@Component({
  selector: 'app-myprofile-tab-user-info',
  templateUrl: './myprofile-tab-user-info.component.html',
  styleUrls: ['./myprofile-tab-user-info.component.sass'],
})
export class MyprofileTabUserInfoComponent implements OnDestroy {
  constructor(private readonly store: Store, private dialog: MatDialog) {}

  user: UserGetDto = new UserGetDto();
  flagsDictionary: Dictionary<Flag> | null = null;
  userInfo$ = this.store.select(selectMyUser);
  userInfoCopySubscription = this.userInfo$.subscribe((user) => {
    this.user = user;
    if (this.flagsDictionary) {
      this.userFlagKey = `fi-${
        this.flagsDictionary![this.user.country]?.key ?? ''
      }`.toLowerCase();
    } else {
      this.store.dispatch(sendRequestToGetFlags());
    }
  });

  userFlagKey: string = '';
  userCountryKey$ = this.store.select(selectFlagsEntities);

  userCountryKeySubscription = this.userCountryKey$.subscribe((flags) => {
    console.log(flags);
    this.flagsDictionary = flags;
    if (this.user.id === 0) {
      this.store.dispatch(sendRequestToGetMyUser());
    }
  });

  handleUpdateProfileDialog() {
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

  handleDeleteProfile() {}

  ngOnDestroy(): void {
    this.userCountryKeySubscription.unsubscribe();
    this.userInfoCopySubscription.unsubscribe();
  }
}
