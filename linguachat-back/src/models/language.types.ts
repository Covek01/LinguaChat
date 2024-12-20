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

export const NullLanguage: LanguageInterface = {
  id: 0,
  name: '',
  popularity: 0,
};
