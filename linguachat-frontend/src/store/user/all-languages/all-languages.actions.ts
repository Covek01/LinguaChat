import { createAction, emptyProps, props } from '@ngrx/store';
import { Language, LanguageInterface } from 'src/models/language.types';
import { allLanguagesAdapter } from './all-languages.state';

//get languages learning by user
export const sendRequestToGetAllLanguages = createAction(
  '[All Languages] Send Request To Get All Languages',
  props<{ id: number }>()
);

export const getResponseForAllLanguages = createAction(
  '[All Languages] Get Response For Getting All Languages',
  props<{ languages: LanguageInterface[] }>()
);

export const getError = createAction(
  '[All Languages] Get Error',
  props<{ error: string }>()
);
