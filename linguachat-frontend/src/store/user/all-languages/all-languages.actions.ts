import { createAction, emptyProps, props } from '@ngrx/store';
import { Language, LanguageInterface } from 'src/models/language.types';
import { allLanguagesAdapter } from './all-languages.state';

//get languages learning by user
export const sendRequestToGetAllLanguages = createAction(
  '[All Languages] Send Request To Get All Languages',
  emptyProps
);

export const getResponseForAllLanguages = createAction(
  '[All Languages] Get Response For Getting All Languages',
  props<{ languages: LanguageInterface[] }>()
);

export const sendRequestForLanguageInsert = createAction(
  '[All Languages] Send request to insert new language',
  props<{ name: string }>()
);

export const getResponseForLanguageInsert = createAction(
  '[All Languages] Get Response for language insertion',
  props<{ language: Language }>()
);

export const sendRequestForLanguageDelete = createAction(
  '[All Languages] Send request to delete new language',
  props<{ languageId: number }>()
);

export const getResponseForLanguageDelete = createAction(
  '[All Languages] Get Response for language deletion',
  props<{ languageId: number }>()
);

export const getError = createAction(
  '[All Languages] Get Error',
  props<{ error: string }>()
);
