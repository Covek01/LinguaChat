import { EntityState } from '@ngrx/entity';
import { LanguageInterface } from 'src/models/language.types';

export interface LanguagesLearningState
  extends EntityState<LanguageInterface> {}
