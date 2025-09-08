import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MyprofileTabOperationsLanguagesDialogComponent } from '../myprofile-tab-operations-languages-dialog/myprofile-tab-operations-languages-dialog.component';

@Component({
  selector: 'app-myprofile-tab-operations-languages',
  templateUrl: './myprofile-tab-operations-languages.component.html',
  styleUrls: ['./myprofile-tab-operations-languages.component.sass'],
})
export class MyprofileTabOperationsLanguagesComponent {
  constructor(private readonly store: Store, private dialog: MatDialog) {}

  public onClick() {}

  public handleAddLanguageDialog(): void {
    const dialogRef = this.dialog.open(
      MyprofileTabOperationsLanguagesDialogComponent,
      {
        width: '500px'
      }
    )
  }
}
