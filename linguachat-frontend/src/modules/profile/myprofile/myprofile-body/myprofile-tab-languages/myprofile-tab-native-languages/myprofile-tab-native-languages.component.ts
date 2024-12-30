import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LanguageInterface } from 'src/models/language.types';
import { selectAllLanguagesNative } from 'src/store/user/languages-native/languages-native.selector';

@Component({
  selector: 'app-myprofile-tab-native-languages',
  templateUrl: './myprofile-tab-native-languages.component.html',
  styleUrls: ['./myprofile-tab-native-languages.component.sass'],
})
export class MyprofileTabNativeLanguagesComponent {
  displayedColumns: string[] = ['name', 'popularity', 'actions'];
  constructor(private readonly store: Store) {}

  natLang: LanguageInterface[] | null = null;
  nativeLanguagesSubscription$ = this.store
    .select(selectAllLanguagesNative)
    .subscribe((el) => {
      this.natLang = el;
    });

  nativeLanguages$ = this.store.select(selectAllLanguagesNative);
}
