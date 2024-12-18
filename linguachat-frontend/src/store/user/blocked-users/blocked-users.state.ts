import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserGetDto } from 'src/models/user.types';
import { BlockedUsersState } from './blocked-users.types';

export function sortByName(a: UserGetDto, b: UserGetDto): number {
  return a.username.localeCompare(b.username);
}

export const blockedUsersAdapter = createEntityAdapter<UserGetDto>({
  sortComparer: sortByName,
});

export const initialStateBlockedUsers: BlockedUsersState =
  blockedUsersAdapter.getInitialState();
