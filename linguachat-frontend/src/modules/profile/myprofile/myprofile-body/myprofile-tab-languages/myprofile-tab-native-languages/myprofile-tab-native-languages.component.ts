import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LanguageInterface } from 'src/models/language.types';
import { selectAllLanguagesNative } from 'src/store/user/languages-native/languages-native.selector';
import { MyprofileTabNativeLanguagesAddDialogComponent } from '../myprofile-tab-native-languages-add-dialog/myprofile-tab-native-languages-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { sendRequestToAddLanguageNative, sendRequestToDeleteLanguageNative } from 'src/store/user/languages-native/languages-native.actions';
import { UserGetDto } from 'src/models/user.types';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-native-languages',
  templateUrl: './myprofile-tab-native-languages.component.html',
  styleUrls: ['./myprofile-tab-native-languages.component.sass'],
})
export class MyprofileTabNativeLanguagesComponent {
  displayedColumns: string[] = ['name', 'popularity', 'actions'];
  myUser: UserGetDto | null = null;
  constructor(private readonly store: Store, private dialog: MatDialog) {}

  myUserSubscription = this.store.select(selectMyUser).subscribe((user) => {
    this.myUser = user;
  });

  natLang: LanguageInterface[] | null = null;
  nativeLanguagesSubscription$ = this.store
    .select(selectAllLanguagesNative)
    .subscribe((nativeLanguages) => {
      this.natLang = nativeLanguages;
    });

  nativeLanguages$ = this.store.select(selectAllLanguagesNative);

  handleAddNativeLanguageDialog(): void {
    const dialogRef = this.dialog.open(
      MyprofileTabNativeLanguagesAddDialogComponent,
      {
        width: '600px',
      }
    );

    dialogRef.afterClosed().subscribe((languageToAdd) => {
      console.log(languageToAdd);
      if (languageToAdd) {
        this.store.dispatch(
          sendRequestToAddLanguageNative({
            userId: this.myUser?.id ?? 0,
            languageId: languageToAdd.id,
          })
        );
      }
    });
  }

  deleteNativeLanguageForUser(languageId: number): void {
    this.store.dispatch(sendRequestToDeleteLanguageNative({
      userId: this.myUser?.id ?? 0,
      languageId,
    }))
  }
}
