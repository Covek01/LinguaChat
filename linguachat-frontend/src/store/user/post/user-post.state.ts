import { createEntityAdapter } from '@ngrx/entity';
import { PostWithLikeInterface, PostsState } from './user-post.types';
import { PostWithLikedAndCount } from 'src/models/post.types';

export const userPostsAdapter = createEntityAdapter<PostWithLikedAndCount>();

export const initialStateUserPosts: PostsState =
  userPostsAdapter.getInitialState();
