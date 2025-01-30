import { EntityState } from '@ngrx/entity';
import { LanguageInterface, LanguageWithLearningLevel } from 'src/models/language.types';

export interface LanguagesLearningState
  extends EntityState<LanguageWithLearningLevel> {}
