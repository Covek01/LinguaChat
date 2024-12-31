import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { LanguageInterface } from 'src/models/language.types';
import { UserGetDto } from 'src/models/user.types';
import { selectAllLanguagesList } from 'src/store/user/all-languages/all-languages.selector';
import { selectAllLanguagesNative } from 'src/store/user/languages-native/languages-native.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-native-languages-add-dialog',
  templateUrl: './myprofile-tab-native-languages-add-dialog.component.html',
  styleUrls: ['./myprofile-tab-native-languages-add-dialog.component.sass'],
})
export class MyprofileTabNativeLanguagesAddDialogComponent {
  myUser: UserGetDto | null = null;
  availableLanguages: LanguageInterface[] | null = null;

  nativeLanguagesMap: Map<number, LanguageInterface> | null = null;

  postForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MyprofileTabNativeLanguagesAddDialogComponent>,
    private fb: FormBuilder,
    private readonly store: Store
  ) {
    this.postForm = this.fb.group({
      language: ['', [Validators.required]],
    });
  }

  languagesNative$ = this.store.select(selectAllLanguagesNative);
  languagesNativeSubscription = this.store
    .select(selectAllLanguagesNative)
    .subscribe((natives) => {
      const map = new Map<number, LanguageInterface>();
      natives.forEach((native) => {
        map.set(native.id, native);
      });
      console.log(map);
      this.nativeLanguagesMap = map;
    });
  availableLanguagesNativeToAdd$ = this.store
    .select(selectAllLanguagesList)
    .pipe(
      map((languages) => {
        return languages.filter(
          (language) => !this.nativeLanguagesMap?.has(language.id)
        );
      })
    );

  availableLanguagesNativeToAddSubscription =
    this.availableLanguagesNativeToAdd$.subscribe((languages) => {
      console.log('AVAILABLE LANGUAGES: ' + languages)
      this.availableLanguages = languages;
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
      const chosenLanguageToAdd: LanguageInterface | null =
        this.availableLanguages?.find(
          (language) => language.name === this.postForm.value.language
        ) ?? null;
      if (!chosenLanguageToAdd) {
        return;
      }
      this.dialogRef.close(chosenLanguageToAdd);
    }
  }
}
