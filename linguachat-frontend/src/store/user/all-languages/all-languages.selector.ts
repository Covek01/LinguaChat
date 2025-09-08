import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AllLanguagesState } from './all-languages.types';
import { allLanguagesAdapter } from './all-languages.state';

const { selectIds, selectEntities, selectAll, selectTotal } =
  allLanguagesAdapter.getSelectors();

export const allLanguagesState =
  createFeatureSelector<AllLanguagesState>('allLanguages');

// select the array of language ids
export const selecAllLanguagesIds = createSelector(
  allLanguagesState,
  selectIds
);

// select the dictionary of languageentities
export const selecAllLanguagesEntities = createSelector(
  allLanguagesState,
  selectEntities
);

// select the array of all languages
export const selectAllLanguagesList = createSelector(
  allLanguagesState,
  selectAll
);

// select the total language count
export const selecAllLanguagesTotal = createSelector(
  allLanguagesState,
  selectTotal
);
