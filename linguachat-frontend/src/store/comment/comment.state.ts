import { createEntityAdapter } from '@ngrx/entity';
import { CommentsForStore, CommentsState } from './comment.types';
import { CommentGetDto } from 'src/models/comment.types';

export const commentsAdapter = createEntityAdapter<CommentGetDto>();

export const initialStateUserComments: CommentsState =
  commentsAdapter.getInitialState();
