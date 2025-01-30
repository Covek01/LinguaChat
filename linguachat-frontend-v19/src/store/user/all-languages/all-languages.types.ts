import { EntityState } from '@ngrx/entity';
import { LanguageInterface } from 'src/models/language.types';

export interface AllLanguagesState
  extends EntityState<LanguageInterface> {}
