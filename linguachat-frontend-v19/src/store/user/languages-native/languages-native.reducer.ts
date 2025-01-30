import { createReducer, on } from '@ngrx/store';
import * as LanguagesLearningActions from './languages-native.actions';
import {
  initialStateLanguagesNative,
  languagesNativeAdapter,
} from './languages-native.state';

export const languagesNativeReducer = createReducer(
  initialStateLanguagesNative,
  on(
    LanguagesLearningActions.getResponseForLanguagesNative,
    (state, { languages }) => {
      return languagesNativeAdapter.setAll(languages, state);
    }
  ),
  on(
    LanguagesLearningActions.getResponseToAddLanguageNative,
    (state, { language }) => {
      return languagesNativeAdapter.addOne(language, state);
    }
  ),
  on(
    LanguagesLearningActions.getResponseToDeleteLanguageNative,
    (state, { id }) => {
      return languagesNativeAdapter.removeOne(id, state);
    }
  )
);
