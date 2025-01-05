import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserGetDto } from 'src/models/user.types';
import { BlockedUsersState } from './blocked-users.types';

export function sortByName(a: UserGetDto, b: UserGetDto): number {
  return a.username.localeCompare(b.username);
}

export function selectUserId(a: UserGetDto): number {
  //In this case this would be optional since primary key is id
  return a.id;
}


export const blockedUsersAdapter = createEntityAdapter<UserGetDto>({
  sortComparer: sortByName,
  selectId: selectUserId,
});

export const initialStateBlockedUsers: BlockedUsersState =
  blockedUsersAdapter.getInitialState();
