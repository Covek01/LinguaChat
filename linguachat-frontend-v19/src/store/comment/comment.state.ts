import { createEntityAdapter } from '@ngrx/entity';
import { CommentsForStore, CommentsState } from './comment.types';
import { CommentGetDto } from 'src/models/comment.types';

export function compareTwoComments(a: CommentGetDto, b: CommentGetDto): number {
  const timeA = new Date(a.time).getTime();
  const timeB = new Date(b.time).getTime();

  return timeB - timeA;
}

export const commentsAdapter = createEntityAdapter<CommentGetDto>({
  sortComparer: compareTwoComments,
});

export const initialStateUserComments: CommentsState =
  commentsAdapter.getInitialState();
