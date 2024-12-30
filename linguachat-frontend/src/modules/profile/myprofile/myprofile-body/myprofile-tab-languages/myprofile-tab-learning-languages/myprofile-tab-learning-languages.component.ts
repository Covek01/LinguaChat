import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LanguageInterface } from 'src/models/language.types';
import { selectLanguagesLearning } from 'src/store/user/languages-learning/languages-learning.selector';

@Component({
  selector: 'app-myprofile-tab-learning-languages',
  templateUrl: './myprofile-tab-learning-languages.component.html',
  styleUrls: ['./myprofile-tab-learning-languages.component.sass'],
})
export class MyprofileTabLearningLanguagesComponent {
  displayedColumns: string[] = ['name', 'popularity', 'actions'];
  constructor(private readonly store: Store) {}

  languagesLearning$ = this.store.select(selectLanguagesLearning);
}
