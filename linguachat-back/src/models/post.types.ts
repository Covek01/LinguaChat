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
  type: string;
  title: string;
  text: string;
  time: Date;

  constructor(id: number, text: string, title: string, type: string) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.type = type;
  }
}

export class PostUpdateDto implements PostInterface {
  id: number;
  title: string;
  text: string;
  type: string;
  languageId: number;
  time: Date;
}

export class PostGetDto implements PostInterface {
  id: number;
  title: string;
  text: string;
  type: string;
  createdBy: UserInterface;
  language: LanguageInterface;
  time: Date;
}

export class PostWithLikedAndCount extends PostGetDto {
    liked: boolean;
    likedCount: number;
}

export const NullPost: PostGetDto = {
  id: 0,
  title: '',
  text: '',
  type: '',
  time: new Date(),
  createdBy: null,
  language: null,
};

export class PostInsertDto {
  title: string;
  text: string;
  type: string;
  creatorId: number;
  languageId: number;
}
