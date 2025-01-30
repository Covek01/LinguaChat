import { createEntityAdapter } from '@ngrx/entity';
import { Language, LanguageInterface } from 'src/models/language.types';
import { LanguagesNativeState } from './languages-native.types';

export const languagesNativeAdapter = createEntityAdapter<LanguageInterface>();

export const initialStateLanguagesNative: LanguagesNativeState =
  languagesNativeAdapter.getInitialState();
