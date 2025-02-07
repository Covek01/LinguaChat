import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { PostGetDto } from 'src/models/post.types';
import { UserGetDto } from 'src/models/user.types';

@Component({
  selector: 'app-myprofile-tab-comment-add-dialog',
  templateUrl: './myprofile-tab-comment-add-dialog.component.html',
  styleUrls: ['./myprofile-tab-comment-add-dialog.component.sass'],
})
export class MyprofileTabCommentAddDialogComponent {
  public commentForm: FormGroup;
  @Input() postReferedTo: PostGetDto | null = null;

  constructor(
    public dialogRef: MatDialogRef<MyprofileTabCommentAddDialogComponent>,
    private fb: FormBuilder,
    private readonly store: Store
  ) {
    this.commentForm = this.fb.group({
      text: ['', [Validators.required]],
    });
  }



  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.commentForm.valid) {
      this.dialogRef.close(this.commentForm.value);
    }
  }
}
