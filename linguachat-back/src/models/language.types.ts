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

// export class LanguageWithLearningLevel {
//   language: Language;
//   level: string;

//   constructor(language: Language, level: string) {
//     this.language = language;
//     this.level = level; 
//   }
// }

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
