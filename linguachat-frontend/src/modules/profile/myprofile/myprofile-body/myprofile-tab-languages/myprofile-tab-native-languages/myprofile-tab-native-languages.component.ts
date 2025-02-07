import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LanguageInterface } from 'src/models/language.types';
import { selectAllLanguagesNative } from 'src/store/user/languages-native/languages-native.selector';
import { MyprofileTabNativeLanguagesAddDialogComponent } from '../myprofile-tab-native-languages-add-dialog/myprofile-tab-native-languages-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  sendRequestToAddLanguageNative,
  sendRequestToDeleteLanguageNative,
} from 'src/store/user/languages-native/languages-native.actions';
import { UserGetDto } from 'src/models/user.types';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myprofile-tab-native-languages',
  templateUrl: './myprofile-tab-native-languages.component.html',
  styleUrls: ['./myprofile-tab-native-languages.component.sass'],
})
export class MyprofileTabNativeLanguagesComponent implements OnDestroy {
  public displayedColumns: string[] = ['name', 'popularity', 'actions'];
  public myUser: UserGetDto | null = null;
  constructor(private readonly store: Store, private dialog: MatDialog) {}

  public nativeLanguages$: Observable<LanguageInterface[]> = this.store.select(
    selectAllLanguagesNative
  );

  public myUserSubscription$ = this.store
    .select(selectMyUser)
    .subscribe((user: UserGetDto) => {
      this.myUser = user;
    });

  ngOnDestroy(): void {
    this.myUserSubscription$.unsubscribe();
  }

  public handleAddNativeLanguageDialog(): void {
    const dialogRef = this.dialog.open(
      MyprofileTabNativeLanguagesAddDialogComponent,
      {
        width: '600px',
      }
    );

    dialogRef.afterClosed().subscribe((languageToAdd) => {
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

  public deleteNativeLanguageForUser(languageId: number): void {
    this.store.dispatch(
      sendRequestToDeleteLanguageNative({
        userId: this.myUser?.id ?? 0,
        languageId,
      })
    );
  }
}
