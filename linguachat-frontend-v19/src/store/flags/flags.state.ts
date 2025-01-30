import { createEntityAdapter } from '@ngrx/entity';
import { FlagsState } from './flags.types';
import { Flag } from 'src/models/models.type';

export function selectFlagName(flag: Flag): string {
  return flag.country;
}

export const flagsAdapter = createEntityAdapter<Flag>({
  selectId: selectFlagName,
});

export const initialStateFlags: FlagsState = flagsAdapter.getInitialState();
