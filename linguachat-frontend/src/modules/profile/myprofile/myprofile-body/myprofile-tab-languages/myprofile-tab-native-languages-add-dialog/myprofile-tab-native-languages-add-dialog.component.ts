import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Language, LanguageInterface } from 'src/models/language.types';
import { UserGetDto } from 'src/models/user.types';
import { selectAllLanguagesList } from 'src/store/user/all-languages/all-languages.selector';
import { selectAllLanguagesNative } from 'src/store/user/languages-native/languages-native.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-tab-native-languages-add-dialog',
  templateUrl: './myprofile-tab-native-languages-add-dialog.component.html',
  styleUrls: ['./myprofile-tab-native-languages-add-dialog.component.sass'],
})
export class MyprofileTabNativeLanguagesAddDialogComponent
  implements OnDestroy
{
  public myUser: UserGetDto | null = null;
  public availableLanguages: LanguageInterface[] | null = null;
  public nativeLanguagesMap: Map<number, LanguageInterface> | null = null;
  public addLanguageForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MyprofileTabNativeLanguagesAddDialogComponent>,
    private fb: FormBuilder,
    private readonly store: Store
  ) {
    this.addLanguageForm = this.fb.group({
      language: ['', [Validators.required]],
    });
  }

  public languagesNative$: Observable<LanguageInterface[]> = this.store.select(
    selectAllLanguagesNative
  );

  public availableLanguagesNativeToAdd$: Observable<Language[]> = this.store
  .select(selectAllLanguagesList)
  .pipe(
    map((languages: Language[]): Language[] => {
      return languages.filter(
        (language: Language) => !this.nativeLanguagesMap?.has(language.id)
      );
    })
  );

  private languagesNativeSubscription$ = this.store
    .select(selectAllLanguagesNative)
    .subscribe((natives: LanguageInterface[]) => {
      const map = new Map<number, LanguageInterface>();
      natives.forEach((native: LanguageInterface) => {
        map.set(native.id, native);
      });
      this.nativeLanguagesMap = map;
    });


  private availableLanguagesNativeToAddSubscription$ =
    this.availableLanguagesNativeToAdd$.subscribe(
      (languages: LanguageInterface[]) => {
        this.availableLanguages = languages;
      }
    );

  private userSubscription$ = this.store
    .select(selectMyUser)
    .subscribe((myUser: UserGetDto) => {
      this.myUser = {
        ...myUser,
      };
    });

  ngOnDestroy(): void {
    this.userSubscription$.unsubscribe();
    this.languagesNativeSubscription$.unsubscribe();
    this.availableLanguagesNativeToAddSubscription$.unsubscribe();
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    const chosenLanguageToAdd: LanguageInterface =
      this.addLanguageForm.value.language;
    this.dialogRef.close(chosenLanguageToAdd);
  }

  public displayLanguage(language: LanguageInterface): string {
    return language ? language.name : '';
  }
}
