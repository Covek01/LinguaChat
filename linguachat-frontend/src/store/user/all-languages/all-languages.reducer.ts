import { createReducer, on } from '@ngrx/store';
import * as AllLanguagesActions from './all-languages.actions';
import {
  allLanguagesAdapter,
  initialStateAllLanguages,
} from './all-languages.state';

export const allLanguagesReducer = createReducer(
  initialStateAllLanguages,
  on(AllLanguagesActions.getResponseForAllLanguages, (state, { languages }) => {
    return allLanguagesAdapter.setAll(languages, state);
  }),
  on(
    AllLanguagesActions.getResponseForLanguageInsert,
    (state, { language }) => {
      return allLanguagesAdapter.addOne(language, state);
    }
  ),
  on(
    AllLanguagesActions.getResponseForLanguageDelete,
    (state, { languageId }) => {
      return allLanguagesAdapter.removeOne(languageId, state);
    }
  )
);
