import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { UserGetDto } from 'src/models/user.types';

@Component({
  selector: 'app-myprofile-update-dialog',
  templateUrl: './myprofile-update-dialog.component.html',
  styleUrls: ['./myprofile-update-dialog.component.sass']
})
export class MyprofileUpdateDialogComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MyprofileUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserGetDto,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: [this.data.name, [Validators.required]],
      surname: [this.data.surname, [Validators.required]],
      username: [this.data.username, Validators.required],
      born: [this.data.born, [Validators.required]],
      country: [this.data.country, [Validators.required]],
      city: [this.data.city, [Validators.required]],
      comment: [this.data.comment, [Validators.required]],
    });
  }

  ngOnInit(): void {
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
