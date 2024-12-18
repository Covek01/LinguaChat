import { EntityState } from '@ngrx/entity';
import { UserGetDto } from 'src/models/user.types';

export type User = UserGetDto;

export interface BlockedUsersState extends EntityState<UserGetDto> {}
