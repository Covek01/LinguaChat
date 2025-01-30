import { UserGetDto } from 'src/models/user.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { langaugesLearningAdapter } from './languages-learning.state';
import { LanguagesLearningState } from './languages-learning.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  langaugesLearningAdapter.getSelectors();

export const languageLearningState =
  createFeatureSelector<LanguagesLearningState>('languagesLearning');

// select the array of connected user ids
export const selectLanguagesLearningIds = createSelector(
  languageLearningState,
  selectIds
);

// select the dictionary of connected user entities
export const selectLanguagesLearningEntities = createSelector(
  languageLearningState,
  selectEntities
);

// select the array of connected users
export const selectLanguagesLearning = createSelector(
  languageLearningState,
  selectAll
);

// select the total connected user count
export const selectLanguagesLearningTotal = createSelector(
  languageLearningState,
  selectTotal
);
