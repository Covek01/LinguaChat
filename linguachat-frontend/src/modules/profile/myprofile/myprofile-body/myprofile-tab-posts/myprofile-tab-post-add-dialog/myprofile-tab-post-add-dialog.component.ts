import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable } from 'rxjs';
import {
  LanguageInterface,
  LanguageWithLearningLevel,
} from 'src/models/language.types';
import { UserGetDto } from 'src/models/user.types';
import { selectLanguagesLearning } from 'src/store/user/languages-learning/languages-learning.selector';
import { selectAllLanguagesNative } from 'src/store/user/languages-native/languages-native.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-post-add-dialog',
  templateUrl: './myprofile-tab-post-add-dialog.component.html',
  styleUrls: ['./myprofile-tab-post-add-dialog.component.sass'],
})
export class MyprofileTabPostAddDialogComponent implements OnDestroy {
  public myUser: UserGetDto | null = null;
  public postLanguages: LanguageInterface[] | null = null;
  public postForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MyprofileTabPostAddDialogComponent>,
    private fb: FormBuilder,
    private readonly store: Store
  ) {
    this.postForm = this.fb.group({
      title: ['Title', [Validators.required, Validators.pattern('[A-Z][^]*')]],
      text: ['Text', [Validators.required, Validators.pattern('[A-Z][^]*')]],
      type: ['Type', Validators.required],
      language: ['', [Validators.required]],
    });

    this.filteredLanguagesOptionsAfterInput$ = this.postForm.valueChanges.pipe(
      map((value) => {
        return this._filter(value.language);
      }) // Filter the language list
    );
  }

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
    this.languagesSubscription$.unsubscribe();
  }

  public languagesLearning$: Observable<LanguageWithLearningLevel[]> =
    this.store.select(selectLanguagesLearning);
  public languagesNative$: Observable<LanguageInterface[]> = this.store.select(
    selectAllLanguagesNative
  );

  public filteredLanguagesOptionsAfterInput$: Observable<LanguageInterface[]>;

  private languagesSubscription$ = combineLatest([
    this.languagesLearning$,
    this.languagesNative$,
  ])
    .pipe(
      map(([array1, array2]) => [...array1, ...array2]),
      map((languages: LanguageInterface[]): LanguageInterface[] => {
        const uniqueLanguages = this._getUniqueLanguages(languages);

        return uniqueLanguages;
      })
    )
    .subscribe((uniqueLanguages: LanguageInterface[]) => {
      this.postLanguages = uniqueLanguages;
    });

  private userSubscription$ = this.store
    .select(selectMyUser)
    .subscribe((myUser: UserGetDto) => {
      this.myUser = {
        ...myUser,
      };
    });

  private _filter(value: string): LanguageInterface[] {
    const filterValue = value.toLowerCase();
    if (this.postLanguages) {
      return this.postLanguages.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    } else {
      return this.postLanguages ?? [];
    }
  }

  private _getUniqueLanguages(
    languages: LanguageInterface[]
  ): LanguageInterface[] {
    // Use a Map to store unique items by a specific key (e.g., a combination of properties)
    const uniqueMap = new Map<number, LanguageInterface>();

    languages.forEach((item) => {
      // Create a unique key for each item (use relevant properties for uniqueness)
      uniqueMap.set(item.id, item);
    });

    // Return the values of the Map, which are the unique items
    return Array.from(uniqueMap.values());
  }

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
