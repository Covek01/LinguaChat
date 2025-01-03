import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { LanguageInterface, LanguageWithLearningLevel } from 'src/models/language.types';
import { UserGetDto } from 'src/models/user.types';
import { selectAllLanguagesList } from 'src/store/user/all-languages/all-languages.selector';
import {
  selectLanguagesLearning,
  selectLanguagesLearningTotal,
} from 'src/store/user/languages-learning/languages-learning.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-learning-languages-add-dialog',
  templateUrl: './myprofile-tab-learning-languages-add-dialog.component.html',
  styleUrls: ['./myprofile-tab-learning-languages-add-dialog.component.sass'],
})
export class MyprofileTabLearningLanguagesAddDialogComponent {
  addLearningLanguageForm: FormGroup;
  myUser: UserGetDto | null = null;
  knowledgeLevels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  learningLanguagesMap: Map<number, LanguageWithLearningLevel> | null = null;
  availableLanguages: LanguageInterface[] | null = null;

  constructor(
    public dialogRef: MatDialogRef<MyprofileTabLearningLanguagesAddDialogComponent>,
    private fb: FormBuilder,
    private readonly store: Store
  ) {
    this.addLearningLanguageForm = this.fb.group({
      language: ['', [Validators.required]],
      level: ['', [Validators.required]],
    });
  }

  languagesLearning$ = this.store.select(selectLanguagesLearning);
  languagesLearningSubscription = this.store
    .select(selectLanguagesLearning)
    .subscribe((learningLanguages) => {
      const map = new Map<number, LanguageWithLearningLevel>();
      learningLanguages.forEach((learningLanguage) => {
        map.set(learningLanguage.id, learningLanguage);
      });
      this.learningLanguagesMap = map;
    });
  availableLanguagesLearningToAdd$ = this.store
    .select(selectAllLanguagesList)
    .pipe(
      map((languages) => {
        return languages.filter(
          (language) => !this.learningLanguagesMap?.has(language.id)
        );
      })
    );

  availableLanguagesNativeToAddSubscription =
    this.availableLanguagesLearningToAdd$.subscribe((languages) => {
      this.availableLanguages = languages;
    });

  userSubscription = this.store.select(selectMyUser).subscribe((myUser) => {
    this.myUser = {
      ...myUser,
    };
  });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const chosenLanguageToAdd: LanguageInterface = this.addLearningLanguageForm.value.language;
    this.dialogRef.close(this.addLearningLanguageForm.value);
  }

  displayLanguage(language: LanguageInterface): string {
    return language ? language.name : '';
  }
}
