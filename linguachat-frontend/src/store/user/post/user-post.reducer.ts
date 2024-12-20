import { createReducer, on } from '@ngrx/store';
import * as PostActions from './user-post.actions';
import { initialStateUserPosts, userPostsAdapter } from './user-post.state';
import { PostWithLikedAndCount } from 'src/models/post.types';

export const postReducer = createReducer(
  initialStateUserPosts,
  on(PostActions.getResponseForPosts, (state, { posts }) => {
    return userPostsAdapter.setAll(posts, state);
  }),
  on(PostActions.getResponseToAddPost, (state, { post }) => {
    const postWithLikedAndCountAttributes: PostWithLikedAndCount = {
        ...post,
        liked: false,
        likedCount: 0
    }
    return userPostsAdapter.addOne(postWithLikedAndCountAttributes, state);
  }),
  on(PostActions.getResponseToDeletePost, (state, { postId }) => {
    return userPostsAdapter.removeOne(postId, state);
  })
);
