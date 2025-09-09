import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Language, LanguageWithLearningLevel } from 'src/models/language.types';
import { UserGetDto } from 'src/models/user.types';
import { selectLanguagesLearning } from 'src/store/user/languages-learning/languages-learning.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';
import { MyprofileTabLearningLanguagesAddDialogComponent } from '../myprofile-tab-learning-languages-add-dialog/myprofile-tab-learning-languages-add-dialog.component';
import {
  sendRequestToAddLanguageLearning,
  sendRequestToDeleteLanguageLearning,
} from 'src/store/user/languages-learning/languages-learning.actions';
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subscription,
  tap,
} from 'rxjs';
import { selectAllLanguagesList } from 'src/store/user/all-languages/all-languages.selector';
import { langaugesLearningAdapter } from 'src/store/user/languages-learning/languages-learning.state';

@Component({
  selector: 'app-myprofile-tab-learning-languages',
  templateUrl: './myprofile-tab-learning-languages.component.html',
  styleUrls: ['./myprofile-tab-learning-languages.component.sass'],
})
export class MyprofileTabLearningLanguagesComponent implements OnDestroy {
  public displayedColumns: string[] = [
    'name',
    'popularity',
    'level',
    'actions',
  ];
  public myUser: UserGetDto | null = null;
  public learningLanguages: LanguageWithLearningLevel[] | null = null;

  constructor(private readonly store: Store, private dialog: MatDialog) {}

  public learningLanguages$: Observable<LanguageWithLearningLevel[]> =
    this.store.select(selectLanguagesLearning);

  private myUserSubscription$ = this.store
    .select(selectMyUser)
    .subscribe((user: UserGetDto) => {
      this.myUser = user;
    });

  private learningLanguagesSubscription$ = this.store
    .select(selectLanguagesLearning)
    .subscribe((learningLanguages: LanguageWithLearningLevel[]) => {
      this.learningLanguages = learningLanguages;
    });

  private allLanguages$: Observable<Language[]> = this.store.select(
    selectAllLanguagesList
  );

  // private learningLanguagesSubscription$: Subscription = combineLatest([
  //   this.learningLanguages$,
  //   this.allLanguages$,
  // ])
  //   .pipe(
  //     tap(([learningLanguages, allLanguages]) => {
  //       console.log(learningLanguages);
  //       console.log(allLanguages);
  //     }),
  //     map(([learningLanguages, allLanguages]): LanguageWithLearningLevel[] => {
  //       return learningLanguages.filter((language) =>
  //         allLanguages
  //           .map((oneLanguage) => oneLanguage.id)
  //           .includes(language.id)
  //       );
  //     })
  //   )
  //   .subscribe(
  //     (languages: LanguageWithLearningLevel[]) =>
  //       (this.learningLanguages = languages)
  //   );

  ngOnDestroy(): void {
    this.learningLanguagesSubscription$.unsubscribe();
    this.myUserSubscription$.unsubscribe();
  }

  public handleAddLearningLanguageDialog(): void {
    const dialogRef = this.dialog.open(
      MyprofileTabLearningLanguagesAddDialogComponent,
      {
        width: '600px',
      }
    );

    dialogRef.afterClosed().subscribe((languageToAddWithLevel) => {
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

  public deleteLearningLanguageForUser(languageId: number): void {
    this.store.dispatch(
      sendRequestToDeleteLanguageLearning({
        userId: this.myUser?.id ?? 0,
        languageId,
      })
    );
  }
}
