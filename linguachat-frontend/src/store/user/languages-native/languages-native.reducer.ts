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
      return langaugesNativeAdapter.setAll(languages, state);
    }
  ),
  on(
    LanguagesLearningActions.getResponseToAddLanguageNative,
    (state, { language }) => {
      return langaugesNativeAdapter.addOne(language, state);
    }
  ),
  on(
    LanguagesLearningActions.getResponseToDeleteLanguageNative,
    (state, { id }) => {
      return langaugesNativeAdapter.removeOne(id, state);
    }
  )
);
