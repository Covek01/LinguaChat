import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { LanguageInterface } from 'src/models/language.types';
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

  constructor(private fb: FormBuilder, private readonly store: Store) {
    this.nativeLanguageForm = this.fb.group({
      language: ['', [Validators.required]],
    });

    this.filteredLanguagesOptionsAfterInput$ = this.nativeLanguageForm.valueChanges.pipe(
      map((value) => {
        console.log(value);
        const a = this._filter(value.language);
        console.log(a);
        return a;
      }) // Filter the language list
    );
  }

  availableLanguagesSubscription = this.languagesLearning$.subscribe(languages => {
    this.availableLanguages = languages;
  })


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
}
