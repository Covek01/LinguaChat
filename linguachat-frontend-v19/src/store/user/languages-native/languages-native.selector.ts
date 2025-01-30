import { UserGetDto } from 'src/models/user.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { languagesNativeAdapter } from './languages-native.state';
import { LanguagesNativeState } from './languages-native.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  languagesNativeAdapter.getSelectors();

export const languageNativeState =
  createFeatureSelector<LanguagesNativeState>('languagesNative');

// select the array of connected user ids
export const selectLanguagesNativeIds = createSelector(
  languageNativeState,
  selectIds
);

// select the dictionary of native language entities
export const selectLanguagesNativeEntities = createSelector(
  languageNativeState,
  selectEntities
);

// select the array of connected users
export const selectAllLanguagesNative = createSelector(
  languageNativeState,
  selectAll
);

// select the total connected user count
export const selectLanguagesNativeTotal = createSelector(
  languageNativeState,
  selectTotal
);
