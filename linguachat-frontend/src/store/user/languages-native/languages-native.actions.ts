import { createAction, emptyProps, props } from '@ngrx/store';
import { LanguageInterface } from 'src/models/language.types';

//get languages learning by user
export const sendRequestToGetLanguagesNative = createAction(
  '[Languages Native] Send Request To Get Languages Native By User',
  props<{ id: number }>()
);

export const getResponseForLanguagesNative = createAction(
  '[Languages Native] Get Response For Getting Languages Native',
  props<{ languages: LanguageInterface[] }>()
);

//add user language learning by user
export const sendRequestToAddLanguageNative = createAction(
  '[Languages Native] Send Request To Add Language Native',
  props<{ userId: number; languageId: number; level: string }>()
);

export const getResponseToAddLanguageNative = createAction(
  '[Languages Native] Get Response For Adding Language Native',
  props<{ language: LanguageInterface }>()
);

//delete language learning by user
export const sendRequestToDeleteLanguageNative = createAction(
  '[Languages Native] Send Request To Delete Language Native',
  props<{ userId: number; languageId: number }>()
);

export const getResponseToDeleteLanguageNative = createAction(
  '[Languages Native] Get Response For Deleting Language Native',
  props<{ id: number }>()
);

export const getError = createAction(
  '[Languages Native] Get Error',
  props<{ error: string }>()
);
