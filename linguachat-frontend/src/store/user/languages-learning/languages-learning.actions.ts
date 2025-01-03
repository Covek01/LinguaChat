import { createAction, emptyProps, props } from '@ngrx/store';
import { LanguageInterface, LanguageWithLearningLevel } from 'src/models/language.types';

//get languages learning by user

export const sendRequestToGetMyLanguagesLearning = createAction(
  '[Languages Learning] Send Request To Get Languages Learning By Me',
  emptyProps
);

export const sendRequestToGetLanguagesLearning = createAction(
  '[Languages Learning] Send Request To Get Languages Learning By User',
  props<{ id: number }>()
);

export const getResponseForLanguagesLearning = createAction(
  '[Languages Learning] Get Response For Getting Languages Learning',
  props<{ languages: LanguageWithLearningLevel[] }>()
);

//add user language learning by user
export const sendRequestToAddLanguageLearning = createAction(
  '[Languages Learning] Send Request To Add Language Learning',
  props<{ userId: number; languageId: number; level: string }>()
);

export const getResponseToAddLanguageLearning = createAction(
  '[Languages Learning] Get Response For Adding Language Learning',
  props<{ language: LanguageWithLearningLevel }>()
);

//delete language learning by user
export const sendRequestToDeleteLanguageLearning = createAction(
  '[Languages Learning] Send Request To Delete Language Learning',
  props<{ userId: number; languageId: number }>()
);

export const getResponseToDeleteLanguageLearning = createAction(
  '[Languages Learning] Get Response For Deleting Language Learning',
  props<{ id: number }>()
);

export const getError = createAction(
  '[Languages Learning] Get Error',
  props<{ error: string }>()
);
