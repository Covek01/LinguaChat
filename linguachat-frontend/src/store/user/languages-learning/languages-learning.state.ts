import { createEntityAdapter } from '@ngrx/entity';
import { Language, LanguageInterface } from 'src/models/language.types';
import { UserGetDto } from 'src/models/user.types';
import { LanguagesLearningState } from './languages-learning.types';

export const langaugesLearningAdapter =
  createEntityAdapter<LanguageInterface>();

export const initialStateLanguagesLearning: LanguagesLearningState =
  langaugesLearningAdapter.getInitialState();
