import { createReducer, on } from '@ngrx/store';
import { langaugesLearningAdapter } from './languages-learning.state';
import * as LanguagesLearningActions from './languages-learning.actions';
import { initialStateLanguagesLearning } from './languages-learning.state';

export const languagesLearningReducer = createReducer(
  initialStateLanguagesLearning,
  on(
    LanguagesLearningActions.getResponseForLanguagesLearning,
    (state, { languages }) => {
      return langaugesLearningAdapter.setAll(languages, state);
    }
  ),
  on(
    LanguagesLearningActions.getResponseToAddLanguageLearning,
    (state, { language }) => {
      return langaugesLearningAdapter.addOne(language, state);
    }
  ),
  on(
    LanguagesLearningActions.getResponseToDeleteLanguageLearning,
    (state, { id }) => {
      return langaugesLearningAdapter.removeOne(id, state);
    }
  )
);
