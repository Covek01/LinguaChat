import { UserGetDto } from 'src/models/user.types';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userPostsAdapter } from './user-post.state';
import { PostsState } from './user-post.types';

const { selectIds, selectEntities, selectAll, selectTotal } =
  userPostsAdapter.getSelectors();

export const languageNativeState =
  createFeatureSelector<PostsState>('posts');

// select the array of connected user ids
export const selectPostIds = createSelector(
  languageNativeState,
  selectIds
);

// select the dictionary of connected user entities
export const selectPostEntities = createSelector(
  languageNativeState,
  selectEntities
);

// select the array of connected users
export const selectAllPosts = createSelector(
  languageNativeState,
  selectAll
);

// select the total connected user count
export const selectPostsTotal = createSelector(
  languageNativeState,
  selectTotal
);
