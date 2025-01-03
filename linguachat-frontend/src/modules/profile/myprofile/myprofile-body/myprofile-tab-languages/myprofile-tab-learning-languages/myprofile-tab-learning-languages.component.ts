import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LanguageInterface } from 'src/models/language.types';
import { UserGetDto } from 'src/models/user.types';
import { selectLanguagesLearning } from 'src/store/user/languages-learning/languages-learning.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';
import { MyprofileTabLearningLanguagesAddDialogComponent } from '../myprofile-tab-learning-languages-add-dialog/myprofile-tab-learning-languages-add-dialog.component';
import { sendRequestToAddLanguageLearning, sendRequestToDeleteLanguageLearning } from 'src/store/user/languages-learning/languages-learning.actions';

@Component({
  selector: 'app-myprofile-tab-learning-languages',
  templateUrl: './myprofile-tab-learning-languages.component.html',
  styleUrls: ['./myprofile-tab-learning-languages.component.sass'],
})
export class MyprofileTabLearningLanguagesComponent {
  displayedColumns: string[] = ['name', 'popularity', 'actions'];
  myUser: UserGetDto | null = null;
  constructor(private readonly store: Store, private dialog: MatDialog) {}

  myUserSubscription = this.store.select(selectMyUser).subscribe((user) => {
    this.myUser = user;
  });

  learningLanguage: LanguageInterface[] | null = null;
  learningLanguagesSubscription$ = this.store
    .select(selectLanguagesLearning)
    .subscribe((learningLanguages) => {
      this.learningLanguage = learningLanguages;
    });

  learningLanguages$ = this.store.select(selectLanguagesLearning);

  handleAddLearningLanguageDialog(): void {
    const dialogRef = this.dialog.open(
      MyprofileTabLearningLanguagesAddDialogComponent,
      {
        width: '600px',
      }
    );

    dialogRef.afterClosed().subscribe((languageToAddWithLevel) => {
      console.log(languageToAddWithLevel);
      if (languageToAddWithLevel && languageToAddWithLevel.language) {
        this.store.dispatch(
          sendRequestToAddLanguageLearning({
            userId: this.myUser?.id ?? 0,
            languageId: languageToAddWithLevel.language.id,
            level: languageToAddWithLevel.level,
          })
        );
      }
    });
  }

  deleteLearningLanguageForUser(languageId: number): void {
    this.store.dispatch(
      sendRequestToDeleteLanguageLearning({
        userId: this.myUser?.id ?? 0,
        languageId,
      })
    );
  }
}
