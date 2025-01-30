import { EntityState } from '@ngrx/entity';
import { CommentGetDto, CommentInterface } from 'src/models/comment.types';
import { Message } from 'src/models/message.types';
import { PostInterface } from 'src/models/post.types';

export interface Chat {
  connectedUserId: number;
  messages: Message[];
}

export interface ChatsState extends EntityState<Chat> {}
