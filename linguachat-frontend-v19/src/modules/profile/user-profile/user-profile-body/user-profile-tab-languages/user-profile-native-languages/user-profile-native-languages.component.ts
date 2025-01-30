import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllLanguagesNative } from 'src/store/user/languages-native/languages-native.selector';
import { selectUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-user-profile-native-languages',
  templateUrl: './user-profile-native-languages.component.html',
  styleUrls: ['./user-profile-native-languages.component.sass'],
})
export class UserProfileNativeLanguagesComponent {
  displayedColumns: string[] = ['name', 'popularity'];
  constructor(private readonly store: Store) {}

  nativeLanguages$ = this.store.select(selectAllLanguagesNative);
}
