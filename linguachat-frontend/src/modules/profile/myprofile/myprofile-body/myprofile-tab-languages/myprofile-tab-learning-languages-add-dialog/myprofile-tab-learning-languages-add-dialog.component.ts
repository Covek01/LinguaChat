import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  Language,
  LanguageInterface,
  LanguageWithLearningLevel,
} from 'src/models/language.types';
import { UserGetDto } from 'src/models/user.types';
import { selectAllLanguagesList } from 'src/store/user/all-languages/all-languages.selector';
import { selectLanguagesLearning } from 'src/store/user/languages-learning/languages-learning.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-learning-languages-add-dialog',
  templateUrl: './myprofile-tab-learning-languages-add-dialog.component.html',
  styleUrls: ['./myprofile-tab-learning-languages-add-dialog.component.sass'],
})
export class MyprofileTabLearningLanguagesAddDialogComponent
  implements OnDestroy
{
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
  
  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
    this.languagesLearningSubscription$.unsubscribe();
    this.availableLanguagesNativeToAddSubscription$.unsubscribe();
  }

  languagesLearning$: Observable<LanguageWithLearningLevel[]> =
    this.store.select(selectLanguagesLearning);

  availableLanguagesLearningToAdd$ = this.store
    .select(selectAllLanguagesList)
    .pipe(
      map((languages: Language[]): Language[] => {
        return languages.filter(
          (language) => !this.learningLanguagesMap?.has(language.id)
        );
      })
    );

  languagesLearningSubscription$ = this.store
    .select(selectLanguagesLearning)
    .subscribe((learningLanguages: LanguageWithLearningLevel[]) => {
      const map = new Map<number, LanguageWithLearningLevel>();
      learningLanguages.forEach(
        (learningLanguage: LanguageWithLearningLevel) => {
          map.set(learningLanguage.id, learningLanguage);
        }
      );
      this.learningLanguagesMap = map;
    });

  availableLanguagesNativeToAddSubscription$ =
    this.availableLanguagesLearningToAdd$.subscribe((languages: Language[]) => {
      this.availableLanguages = languages;
    });

  userSubscription$ = this.store
    .select(selectMyUser)
    .subscribe((myUser: UserGetDto) => {
      this.myUser = {
        ...myUser,
      };
    });

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const chosenLanguageToAdd: LanguageInterface =
      this.addLearningLanguageForm.value.language;
    this.dialogRef.close(this.addLearningLanguageForm.value);
  }

  displayLanguage(language: LanguageInterface): string {
    return language ? language.name : '';
  }
}
