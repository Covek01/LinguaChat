import { createEntityAdapter } from '@ngrx/entity';
import { Language, LanguageInterface, LanguageWithLearningLevel } from 'src/models/language.types';
import { LanguagesLearningState } from './languages-learning.types';

export const langaugesLearningAdapter =
  createEntityAdapter<LanguageWithLearningLevel>();

export const initialStateLanguagesLearning: LanguagesLearningState =
  langaugesLearningAdapter.getInitialState();
