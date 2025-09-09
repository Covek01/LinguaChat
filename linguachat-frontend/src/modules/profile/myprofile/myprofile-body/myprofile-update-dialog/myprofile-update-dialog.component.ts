import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { count, map, Observable, withLatestFrom } from 'rxjs';
import { Flag } from 'src/models/models.type';
import { UserGetDto } from 'src/models/user.types';
import {
  selectFlagsEntities,
  selectFlagsList,
} from 'src/store/flags/flags.selector';

@Component({
  selector: 'app-myprofile-update-dialog',
  templateUrl: './myprofile-update-dialog.component.html',
  styleUrls: ['./myprofile-update-dialog.component.sass'],
})
export class MyprofileUpdateDialogComponent implements OnInit {
  public userForm: FormGroup;
  public filteredCountries$: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<MyprofileUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserGetDto,
    private fb: FormBuilder,
    private store: Store
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

    this.filteredCountries$ = this.userForm.valueChanges.pipe(
      withLatestFrom(this.countries$),
      map(([form, countries]) => {
        if (typeof form.country !== 'string') {
          return [];
        }
        const countryValue: string = form.country;
        return countries.filter((country) =>
          country.toLowerCase().includes(countryValue.toLowerCase())
        );
      }) // Filter the language list
    );
  }

  public countries$: Observable<string[]> = this.store
    .select(selectFlagsList)
    .pipe(map((flags: Flag[]): string[] => flags.map((flag) => flag.country)));

  ngOnInit(): void {}

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
