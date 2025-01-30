import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Dictionary } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Flag } from 'src/models/models.type';
import { UserGetDto, UserGetDtoWithUserFlagKey } from 'src/models/user.types';
import { selectFlagsEntities } from 'src/store/flags/flags.selector';
import { selectMyUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-myprofile-barleft-item',
  templateUrl: './myprofile-barleft-item.component.html',
  styleUrls: ['./myprofile-barleft-item.component.sass'],
})
export class MyprofileBarleftItemComponent {
  @Input() user: UserGetDtoWithUserFlagKey = new UserGetDtoWithUserFlagKey();
  flagsMap: Dictionary<Flag> | null = null;

  constructor(private readonly store: Store, private readonly router: Router) {}

  handleClickToViewUserProfile(): void {
    console.log('I AM INVOKED MY FRIEND');
    this.router.navigate([`/user`, this.user.id]).then(
      (nav) => {
        console.log(nav); // true if navigation is successful
      },
      (err) => {
        console.log(err); // when there's an error
      }
    );
  }
}
