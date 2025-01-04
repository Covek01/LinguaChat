import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, map, mergeMap, reduce } from 'rxjs';
import { LanguageInterface } from 'src/models/language.types';
import { Post, PostInsertDto, PostInterface } from 'src/models/post.types';
import { UserGetDto } from 'src/models/user.types';
import {
  selectLanguagesLearning,
  selectLanguagesLearningTotal,
} from 'src/store/user/languages-learning/languages-learning.selector';
import {
  selectAllLanguagesNative,
  selectLanguagesNativeIds,
} from 'src/store/user/languages-native/languages-native.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-post-add-dialog',
  templateUrl: './myprofile-tab-post-add-dialog.component.html',
  styleUrls: ['./myprofile-tab-post-add-dialog.component.sass'],
})
export class MyprofileTabPostAddDialogComponent implements OnDestroy {
  myUser: UserGetDto | null = null;
  postLanguages: LanguageInterface[] | null = null;
  postForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MyprofileTabPostAddDialogComponent>,
    private fb: FormBuilder,
    private readonly store: Store
  ) {
    this.postForm = this.fb.group({
      title: [
        'Title',
        [Validators.required, Validators.pattern('[A-Z][^]*')],
      ],
      text: ['Text', [Validators.required, Validators.pattern('[A-Z][^]*')]],
      type: ['Type', Validators.required],
      language: ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.languagesSubscription.unsubscribe();
  }

  languagesLearning$ = this.store.select(selectLanguagesLearning);
  languagesNative$ = this.store.select(selectAllLanguagesNative);

  languagesSubscription = combineLatest([
    this.languagesLearning$,
    this.languagesNative$,
  ])
    .pipe(map(([array1, array2]) => [...array1, ...array2]))
    .subscribe((languages) => {
      const uniqueLanguages = Array.from(
        new Set(languages.map((item) => JSON.stringify(item)))
      ).map((string) => JSON.parse(string));

      this.postLanguages = uniqueLanguages;
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
    if (this.postForm.valid) {
      const selectedLanguageId = this.postLanguages?.find(
        (language) => language.name === this.postForm.value.language
      )?.id;

      const returnObjectWithLanguageProperty = {
        ...this.postForm.value,
        languageId: selectedLanguageId,
        creatorId: this.myUser?.id,
      };

      const { language, ...postInsertDto } = returnObjectWithLanguageProperty;

      this.dialogRef.close(postInsertDto);
    }
  }
}
