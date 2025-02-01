import { LanguageInterface } from './language.types';
import { UserInterface } from './user.types';

//Post
export interface PostInterface {
  id: number;
  title: string;
  text: string;
  type: string;
  time: Date;
}

export class Post implements PostInterface {
  id: number;
  title: string;
  type: string;
  text: string;
  time: Date;

  constructor(
    id: number,
    title: string,
    text: string,
    type: string,
    time: Date
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.type = type;
    this.time = time;
  }
}

export class PostUpdateDto implements PostInterface {
  id: number;
  title: string;
  text: string;
  type: string;
  languageId: number;
  time: Date;

  constructor(
    id: number,
    title: string,
    text: string,
    type: string,
    languageId: number,
    time: Date
  ) {
    this.title = title;
    this.id = id;
    this.text = text;
    this.type = type;
    this.languageId = languageId;
    this.time = time;
  }
}

export class PostGetDto implements PostInterface {
  id: number;
  title: string;
  text: string;
  type: string;
  createdBy: UserInterface | null;
  language: LanguageInterface | null;
  time: Date;

  constructor(
    id: number,
    title: string,
    text: string,
    type: string,
    createdBy: UserInterface,
    language: LanguageInterface,
    time: Date
  ) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.type = type;
    this.createdBy = createdBy;
    this.language = language;
    this.time = time;
  }
}

export class PostWithLikedAndCount extends PostGetDto {
  liked: boolean;
  likedCount: number;

  constructor(
    id: number,
    title: string,
    text: string,
    type: string,
    createdBy: UserInterface,
    language: LanguageInterface,
    time: Date,
    liked: boolean,
    likedCount: number
  ) {
    super(id, title, text, type, createdBy, language, time);
    this.liked = liked;
    this.likedCount = likedCount;
  }
}

export const NullPost: PostGetDto = {
  id: 0,
  text: '',
  type: '',
  title: '',
  createdBy: null,
  language: null,
  time: new Date(),
};

export class PostInsertDto {
  title: string;
  text: string;
  type: string;
  creatorId: number;
  languageId: number;

  constructor(
    title: string,
    text: string,
    type: string,
    creatorId: number,
    languageId: number
  ) {
    this.title = title;
    this.text = text;
    this.type = type;
    this.creatorId = creatorId;
    this.languageId = languageId;
  }
}
