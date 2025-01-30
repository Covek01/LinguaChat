import { createEntityAdapter } from '@ngrx/entity';
import { Language, LanguageInterface } from 'src/models/language.types';
import { AllLanguagesState } from './all-languages.types';

export const allLanguagesAdapter =
  createEntityAdapter<Language>();

export const initialStateAllLanguages: AllLanguagesState =
  allLanguagesAdapter.getInitialState();
