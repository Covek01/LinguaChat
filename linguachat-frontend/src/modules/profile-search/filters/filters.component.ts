import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { LanguageInterface } from 'src/models/language.types';
import {
  sendRequestToGetFilteredUsers,
  sendRequestToGetFilteredUsersByMe,
  setFilteredLanguageId,
} from 'src/store/filtered-users/filtered-users.actions';
import {
  selectLanguagesLearning,
  selectLanguagesLearningEntities,
} from 'src/store/user/languages-learning/languages-learning.selector';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.sass'],
})
export class FiltersComponent {
  nativeLanguageForm: FormGroup;
  availableLanguages: LanguageInterface[] | null = null;

  filteredLanguagesOptionsAfterInput$: Observable<LanguageInterface[]>;
  languagesLearning$ = this.store.select(selectLanguagesLearning);

  constructor(private fb: FormBuilder, private readonly store: Store,
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

  availableLanguagesSubscription = this.languagesLearning$.subscribe(
    (languages) => {
      this.availableLanguages = languages;
    }
  );

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
    console.log(this.nativeLanguageForm.value)
    if (this.nativeLanguageForm.value.language.id) {
      const languageId = this.nativeLanguageForm.value.language.id;
      this.store.dispatch(sendRequestToGetFilteredUsersByMe({ languageId }));
      this.store.dispatch(setFilteredLanguageId({ languageId }));
    } else {
      this.snackBar.open('Language not selected!', 'Close')
    }
  }

  displayLanguage(language: LanguageInterface): string {
    return language ? language.name : '';
  }
}
