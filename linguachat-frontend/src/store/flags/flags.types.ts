import { EntityState } from '@ngrx/entity';
import { Flag } from 'src/models/models.type';

export interface FlagsState
  extends EntityState<Flag> {}
