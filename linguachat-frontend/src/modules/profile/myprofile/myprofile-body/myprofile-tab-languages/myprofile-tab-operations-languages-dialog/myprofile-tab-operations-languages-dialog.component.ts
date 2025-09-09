import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Language } from 'src/models/language.types';
import {
  sendRequestForLanguageDelete,
  sendRequestForLanguageInsert,
} from 'src/store/user/all-languages/all-languages.actions';
import { selectAllLanguagesList } from 'src/store/user/all-languages/all-languages.selector';

@Component({
  selector: 'app-myprofile-tab-operations-languages-dialog',
  templateUrl: './myprofile-tab-operations-languages-dialog.component.html',
  styleUrls: ['./myprofile-tab-operations-languages-dialog.component.sass'],
})
export class MyprofileTabOperationsLanguagesDialogComponent
  implements OnDestroy
{
  public languages: Language[] = [];

  newLanguage = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(50)],
  });

  constructor(
    private dialogRef: MatDialogRef<MyprofileTabOperationsLanguagesDialogComponent>,
    private readonly store: Store,
    private fb: FormBuilder
  ) {}

  allLanguages$: Observable<Language[]> = this.store.select(
    selectAllLanguagesList
  );

  allLanguagesSubscription$: Subscription = this.allLanguages$.subscribe(
    (languages: Language[]) => {
      this.languages = languages;
    }
  );

  ngOnDestroy(): void {
    this.allLanguagesSubscription$.unsubscribe();
  }

  public addLanguage() {
    const name = this.convertToCapitalLetter(this.newLanguage.value.trim());
    if (!name) {
      this.newLanguage.setValue('');
      this.newLanguage.markAsTouched();
      return;
    }
    if (
      this.languages.some(
        (language) => language.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      this.newLanguage.setErrors({ duplicate: true });
      return;
    }

    this.store.dispatch(sendRequestForLanguageInsert({ name }));
    this.newLanguage.setValue('');
  }

  public removeLanguage(languageId: number) {
    this.store.dispatch(sendRequestForLanguageDelete({ languageId }));
  }

  public onSubmit(): void {
    this.dialogRef.close();
  }

  private convertToCapitalLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
