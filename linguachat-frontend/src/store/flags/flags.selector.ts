import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlagsState } from './flags.types';
import { flagsAdapter } from './flags.state';

const { selectIds, selectEntities, selectAll, selectTotal } =
  flagsAdapter.getSelectors();

export const flagsState = createFeatureSelector<FlagsState>('flags');

// select the array of Flags ids
export const selecFlagsIds = createSelector(flagsState, selectIds);

// select the dictionary of Flags entities
export const selecFlagsEntities = createSelector(flagsState, selectEntities);

// select the array of Flags
export const selectFlagsList = createSelector(flagsState, selectAll);

// select the total Flags count
export const selecFlagsTotal = createSelector(flagsState, selectTotal);
