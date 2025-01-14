import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { LanguageInterface } from 'src/models/language.types';
import {
  sendRequestToGetCountByMe,
  sendRequestToGetFilteredUsers,
  sendRequestToGetFilteredUsersByMe,
  sendRequestToGetFilteredUsersPaginationByMe,
  setFilteredLanguageId,
} from 'src/store/filtered-users/filtered-users.actions';
import { selectPaginatorSize } from 'src/store/filtered-users/filtered-users.selector';
import {
  selectLanguagesLearning,
  selectLanguagesLearningEntities,
} from 'src/store/user/languages-learning/languages-learning.selector';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass'],
})
export class FiltersComponent implements OnDestroy {
  nativeLanguageForm: FormGroup;
  availableLanguages: LanguageInterface[] | null = null;
  paginatorSize: number = 0;

  filteredLanguagesOptionsAfterInput$: Observable<LanguageInterface[]>;
  languagesLearning$ = this.store.select(selectLanguagesLearning);

  constructor(
    private fb: FormBuilder,
    private readonly store: Store,
    private snackBar: MatSnackBar
  ) {
    this.nativeLanguageForm = this.fb.group({
      language: ['', [Validators.required]],
    });

    this.filteredLanguagesOptionsAfterInput$ =
      this.nativeLanguageForm.valueChanges.pipe(
        map((value) => {
          if (typeof value.language !== 'string') {
            return [];
          }
          const a = this._filter(value.language);
          return a;
        }) // Filter the language list
      );
  }
  ngOnDestroy(): void {
    this.availableLanguagesSubscription.unsubscribe();
    this.paginatorSizeSubscription.unsubscribe();
  }

  availableLanguagesSubscription = this.languagesLearning$.subscribe(
    (languages) => {
      this.availableLanguages = languages;
    }
  );

  paginatorSizeSubscription = this.store
    .select(selectPaginatorSize)
    .subscribe((size) => {
      this.paginatorSize = size;
    });

  private _filter(value: string): LanguageInterface[] {
    const filterValue = value.toLowerCase();
    if (this.availableLanguages) {
      return this.availableLanguages.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    } else {
      return this.availableLanguages ?? [];
    }
  }

  filterUsers(): void {
    console.log(this.nativeLanguageForm.value);
    if (this.nativeLanguageForm.value.language.id) {
      const languageId = this.nativeLanguageForm.value.language.id;
      this.store.dispatch(
        sendRequestToGetFilteredUsersPaginationByMe({
          languageId,
          limit: 10,
          offset: 0,
        })
      );
      this.store.dispatch(setFilteredLanguageId({ languageId }));
      this.store.dispatch(sendRequestToGetCountByMe({ languageId }));
    } else {
      this.snackBar.open('Language not selected!', 'Close');
    }
  }

  displayLanguage(language: LanguageInterface): string {
    return language ? language.name : '';
  }
}
