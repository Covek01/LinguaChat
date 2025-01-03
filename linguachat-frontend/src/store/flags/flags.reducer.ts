import { createReducer, on } from '@ngrx/store';
import * as AllLanguagesActions from './flags.actions';
import { flagsAdapter, initialStateFlags } from './flags.state';

export const flagsReducer = createReducer(
  initialStateFlags,
  on(AllLanguagesActions.getResponseForFlags, (state, { flags }) => {
    return flagsAdapter.setAll(flags, state);
  })
);
