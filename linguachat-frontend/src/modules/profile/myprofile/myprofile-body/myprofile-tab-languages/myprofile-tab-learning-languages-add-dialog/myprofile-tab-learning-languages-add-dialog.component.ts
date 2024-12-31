import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserGetDto } from 'src/models/user.types';
import { selectLanguagesLearning } from 'src/store/user/languages-learning/languages-learning.selector';

@Component({
  selector: 'app-myprofile-tab-learning-languages-add-dialog',
  templateUrl: './myprofile-tab-learning-languages-add-dialog.component.html',
  styleUrls: ['./myprofile-tab-learning-languages-add-dialog.component.sass']
})
export class MyprofileTabLearningLanguagesAddDialogComponent {
  commentForm: FormGroup;
  myUser: UserGetDto | null = null;

  constructor(
    public dialogRef: MatDialogRef<MyprofileTabLearningLanguagesAddDialogComponent>,
    private fb: FormBuilder,
    private readonly store: Store
  ) {
    this.commentForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  languagesLearning$ = this.store.select(selectLanguagesLearning);


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      this.dialogRef.close(this.commentForm.value);
    }
  }
}
