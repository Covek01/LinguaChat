//Language
export interface LanguageInterface {
  id: number;
  name: string;
  popularity: number;
}

export class Language implements LanguageInterface {
  id: number;
  name: string;
  popularity: number;

  constructor(id: number, name: string, popularity: number) {
    this.id = id;
    this.name = name;
    this.popularity = popularity;
  }
}

export class LanguageWithLearningLevel extends Language {
  level: string;

  constructor(id: number, name: string, popularity: number, level: string) {
    super(id, name, popularity);
    this.level = level;
  }
}

export const NullLanguage: LanguageInterface = {
  id: 0,
  name: '',
  popularity: 0,
};

export interface LanguageIdList {
  languagesIds: number[];
}
