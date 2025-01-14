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
      likedCount: 0,
    };
    return userPostsAdapter.addOne(postWithLikedAndCountAttributes, state);
  }),
  on(PostActions.getResponseToDeletePost, (state, { postId }) => {
    return userPostsAdapter.removeOne(postId, state);
  }),
  on(PostActions.getResponseToLikePost, (state, { userId, postId }) => {
    const post = state.entities[postId] ?? null;
    console.log("RX PROVERA ZA POST UPDATE")
    console.log(post) 
    if (post) {
      const postNew = {
        ...post,
        liked: true
      }
      console.log(post);
      return userPostsAdapter.updateOne(
        {
          id: postId,
          changes: postNew,
        },
        state
      );
    }

    return state;
  }),
  on(PostActions.getResponseToUnlikePost, (state, { userId, postId }) => {
    const post = state.entities[postId] ?? null;
    console.log("RX PROVERA ZA POST UPDATE")
    console.log(post)
    if (post) {
      const postNew = {
        ...post,
        liked: false
      }
      return userPostsAdapter.updateOne(
        {
          id: postId,
          changes: postNew,
        },
        state
      );
    }

    return state;
  }),
  on(PostActions.getResponseForAddingPaginatedPostsByMe, (state, { posts }) => {
    return userPostsAdapter.addMany(posts, state);
  }),
);
