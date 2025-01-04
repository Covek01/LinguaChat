import { Component, Input } from '@angular/core';
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

  constructor(private readonly store: Store) {}

  // userFlagKey: string = '';
  // userCountryKey$ = this.store.select(selectFlagsEntities);
  // userCountryKeySubscription = this.userCountryKey$.subscribe((flags) => {
  //   this.flagsMap = flags;
  //   console.log(flags);
  // });

  // myUserSubscription = this.store.select(selectMyUser).subscribe((user) => {
  //   if (!this.flagsMap) {
  //     return;
  //   }
  //   this.userFlagKey = `fi-${
  //     this.flagsMap[this.user.country]?.key ?? ''
  //   }`.toLowerCase();
  // });
}
