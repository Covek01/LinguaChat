import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserGetDto } from 'src/models/user.types';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-body',
  templateUrl: './myprofile-body.component.html',
  styleUrls: ['./myprofile-body.component.sass'],
})
export class MyprofileBodyComponent implements OnDestroy {
  public myUser: UserGetDto | null = null;

  constructor(private readonly store: Store) {}

  private myUserSubscription$ = this.store
    .select(selectMyUser)
    .subscribe((user: UserGetDto) => {
      this.myUser = user;
    });

  ngOnDestroy(): void {
    this.myUserSubscription$.unsubscribe();
  }
}
