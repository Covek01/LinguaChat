import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';
import { DatePipe } from '@angular/common';
import { User, UserGetDto } from 'src/models/user.types';
import { MatDialog } from '@angular/material/dialog';
import { MyprofileUpdateDialogComponent } from '../myprofile-update-dialog/myprofile-update-dialog.component';
import { sendRequestToUpdateMyUser } from 'src/store/user/user-data/user-data.actions';

@Component({
  selector: 'app-myprofile-tab-user-info',
  templateUrl: './myprofile-tab-user-info.component.html',
  styleUrls: ['./myprofile-tab-user-info.component.sass'],
})
export class MyprofileTabUserInfoComponent {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private dialog: MatDialog
  ) {
  }
  user: UserGetDto = new UserGetDto();
  userInfo$ = this.store.select(selectMyUser);
  userInfoCopy$ = this.userInfo$.subscribe((user) => {
    this.user = user;
  });

  handleUpdateProfileDialog() {
    const dialogRef = this.dialog.open(MyprofileUpdateDialogComponent, {
      data: this.user,
      width: "600px"
    });

    dialogRef.afterClosed().subscribe((updateResult) => {
      if (updateResult) {
        const updateObject = {
          ...this.user,
          ...updateResult,
        }
        this.store.dispatch(sendRequestToUpdateMyUser({ user: updateObject }));
      }
    });
  }

  handleDeleteProfile() {}
}
