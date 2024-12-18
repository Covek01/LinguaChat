import { UserGetDto } from 'src/models/user.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { languagesNativeAdapter } from './languages-native.state';
import { LanguagesNativeState } from './languages-native.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  languagesNativeAdapter.getSelectors();

export const languageNativeState =
  createFeatureSelector<LanguagesNativeState>('languagesNative');

// select the array of connected user ids
export const selectBlockedUserIds = createSelector(
  languageNativeState,
  selectIds
);

// select the dictionary of connected user entities
export const selectBlockedUserEntities = createSelector(
  languageNativeState,
  selectEntities
);

// select the array of connected users
export const selectAllBlockedUsers = createSelector(
  languageNativeState,
  selectAll
);

// select the total connected user count
export const selectBlockedUsersTotal = createSelector(
  languageNativeState,
  selectTotal
);
