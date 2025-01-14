import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LanguageInterface } from 'src/models/language.types';

@Component({
  selector: 'app-feed-filters',
  templateUrl: './feed-filters.component.html',
  styleUrls: ['./feed-filters.component.sass'],
})
export class FeedFiltersComponent {
  nativeLanguageForm: FormGroup;

  constructor(private fb: FormBuilder, private readonly store: Store) {
    this.nativeLanguageForm = this.fb.group({
      language: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  
  filterUsers(): void {
    console.log(this.nativeLanguageForm.value);
  }

  displayLanguage(language: LanguageInterface): string {
    return language ? language.name : '';
  }
}
