import { Component } from '@angular/core';
import { MyprofileBlockedUsersDialogComponent } from '../myprofile-blocked-users-dialog/myprofile-blocked-users-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-myprofile-blocked-users',
  templateUrl: './myprofile-blocked-users.component.html',
  styleUrls: ['./myprofile-blocked-users.component.sass'],
})
export class MyprofileBlockedUsersComponent {
  constructor(private dialog: MatDialog) {}

  public handleBlockedUsersDialog(): void {
    const dialogRef = this.dialog.open(MyprofileBlockedUsersDialogComponent, {
      width: '400px',
      maxHeight: '400px'
    });
  }
}
