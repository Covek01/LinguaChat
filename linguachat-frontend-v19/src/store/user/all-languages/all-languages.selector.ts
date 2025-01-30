import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AllLanguagesState } from './all-languages.types';
import { allLanguagesAdapter } from './all-languages.state';

const { selectIds, selectEntities, selectAll, selectTotal } =
  allLanguagesAdapter.getSelectors();

export const allLanguagesState =
  createFeatureSelector<AllLanguagesState>('allLanguages');

// select the array of connected user ids
export const selecAllLanguagesIds = createSelector(
  allLanguagesState,
  selectIds
);

// select the dictionary of connected user entities
export const selecAllLanguagesEntities = createSelector(
  allLanguagesState,
  selectEntities
);

// select the array of connected users
export const selectAllLanguagesList = createSelector(
  allLanguagesState,
  selectAll
);

// select the total connected user count
export const selecAllLanguagesTotal = createSelector(
  allLanguagesState,
  selectTotal
);
