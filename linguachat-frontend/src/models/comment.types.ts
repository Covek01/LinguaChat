import { PostInterface } from './post.types';
import { UserInterface } from './user.types';

//Comment
export interface CommentInterface {
  id: number;
  text: string;
  time: Date;
}



export class CommentDto implements CommentInterface {
  id: number;
  text: string;
  time: Date;

  constructor(id: number, text: string, time: Date) {
    this.id = id;
    this.text = text;
    this.time = time;
  }
}

export class CommentGetDto implements CommentInterface {
  id: number;
  text: string;
  time: Date;
  postRelatedTo: PostInterface;
  userCommented: UserInterface;

  constructor(
    id: number,
    text: string,
    time: Date,
    postRelatedTo: PostInterface,
    userCommented: UserInterface
  ) {
    this.id = id;
    this.text = text;
    this.time = time;
    this.postRelatedTo = postRelatedTo;
    this.userCommented = userCommented;
  }
}

export class CommentInsertDto {
  text: string;
  postRelatedToId: number;
  userCommentedId: number;

  constructor(text: string, postRelatedToId: number, userCommentedId: number) {
    this.text = text;
    this.postRelatedToId = postRelatedToId;
    this.userCommentedId = userCommentedId;
  }
}
export const NullComment = {
  id: 0,
  text: '',
  postRelatedTo: null,
  userCommented: null,
};
