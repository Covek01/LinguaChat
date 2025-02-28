import { EntityState } from '@ngrx/entity';
import { UserGetDto } from 'src/models/user.types';

export interface FilteredUsersState extends EntityState<UserGetDto> {
  paginatorSize: number;
  filteredLanguageId: number;
  userCount: number;
}
