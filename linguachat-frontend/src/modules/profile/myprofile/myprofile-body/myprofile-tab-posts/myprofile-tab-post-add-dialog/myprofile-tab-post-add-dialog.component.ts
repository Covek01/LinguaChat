import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostInsertDto } from 'src/models/post.types';

@Component({
  selector: 'app-myprofile-tab-post-add-dialog',
  templateUrl: './myprofile-tab-post-add-dialog.component.html',
  styleUrls: ['./myprofile-tab-post-add-dialog.component.sass'],
})
export class MyprofileTabPostAddDialogComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MyprofileTabPostAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostInsertDto,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      title: [this.data.title, [Validators.required]],
      text: [this.data.text, [Validators.required]],
      type: [this.data.type, Validators.required],
      languageId: [this.data.languageId, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
