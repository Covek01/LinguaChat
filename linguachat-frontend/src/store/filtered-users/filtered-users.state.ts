import { createEntityAdapter } from '@ngrx/entity';
import { UserGetDto } from 'src/models/user.types';
import { FilteredUsersState } from './filtered-users.types';

export function compareTwoFilteredUsers(a: UserGetDto, b: UserGetDto): number {
  const timeA = new Date(a.since).getTime();
  const timeB = new Date(b.since).getTime();

  return timeB - timeA;
}

export const filteredUsersAdapter = createEntityAdapter<UserGetDto>({
  sortComparer: compareTwoFilteredUsers,
});

export const initialStateFilteredUsers: FilteredUsersState =
  filteredUsersAdapter.getInitialState({
    paginatorSize: 10,
    filteredLanguageId: 0,
  });
