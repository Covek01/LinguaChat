import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllFilteredUsers, selectFilteredUsersState } from 'src/store/filtered-users/filtered-users.selector';

@Component({
  selector: 'app-filtered-profiles',
  templateUrl: './filtered-profiles.component.html',
  styleUrls: ['./filtered-profiles.component.sass'],
})
export class FilteredProfilesComponent {
  displayedColumns: string[] = ['username', 'born', 'country', 'city', 'since'];
  constructor(private readonly store: Store){}

  filteredUsers$ = this.store.select(selectAllFilteredUsers);
}
