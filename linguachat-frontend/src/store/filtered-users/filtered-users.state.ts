import { createEntityAdapter } from '@ngrx/entity';
import { UserGetDto } from 'src/models/user.types';
import { FilteredUsersState } from './filtered-users.types';

export const filteredUsersAdapter = createEntityAdapter<UserGetDto>();

export const initialStateFilteredUsers: FilteredUsersState =
filteredUsersAdapter.getInitialState();
