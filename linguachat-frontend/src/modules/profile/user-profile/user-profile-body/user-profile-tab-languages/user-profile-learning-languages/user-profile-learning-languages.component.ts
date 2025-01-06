import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectLanguagesLearning,
  selectLanguagesLearningIds,
} from 'src/store/user/languages-learning/languages-learning.selector';

@Component({
  selector: 'app-user-profile-learning-languages',
  templateUrl: './user-profile-learning-languages.component.html',
  styleUrls: ['./user-profile-learning-languages.component.sass'],
})
export class UserProfileLearningLanguagesComponent {
  displayedColumns: string[] = ['name', 'popularity', 'level'];
  constructor(private readonly store: Store) {}

  learningLanguages$ = this.store.select(selectLanguagesLearning);
}
