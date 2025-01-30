import { EntityState } from '@ngrx/entity';
import { CommentGetDto, CommentInterface } from 'src/models/comment.types';
import { PostInterface } from 'src/models/post.types';

export interface CommentsForStore {
  postId: number;
  comments: CommentInterface[];
}

export interface CommentsState extends EntityState<CommentGetDto> {}
