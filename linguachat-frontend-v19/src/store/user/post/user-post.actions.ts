import { createAction, emptyProps, props } from '@ngrx/store';
import {
  PostGetDto,
  PostInsertDto,
  PostInterface,
  PostWithLikedAndCount,
} from 'src/models/post.types';

//get posts of user
export const sendRequestToGetPosts = createAction(
  '[User Post] Send Request To Get User Posts',
  props<{ userId: number }>()
);

export const sendRequestToGetPostsByMe = createAction(
  '[User Post] Send Request To Get User Posts By Me',
  emptyProps
);

export const getResponseForPosts = createAction(
  '[User Post] Get Response For Getting User Posts',
  props<{ posts: PostWithLikedAndCount[] }>()
);

//Filtered Post Pagination
export const sendRequestToGetPaginatedPostsByMe = createAction(
  '[User Post] Send Request To Get Paginated Posts By Me',
  props<{ limit: number; offset: number }>()
);

export const getResponseForGettingPaginatedPostsByMe = createAction(
  '[User Post] Get Response For Getting Paginated Posts By Me',
  props<{ posts: PostWithLikedAndCount[] }>()
);

//Filtered Post Pagination add
export const sendRequestToAddPaginatedPostsByMe = createAction(
  '[User Post] Send Request To Add Paginated Posts By Me',
  props<{ limit: number; offset: number }>()
);

export const getResponseForAddingPaginatedPostsByMe = createAction(
  '[User Post] Get Response For Adding Paginated Posts By Me',
  props<{ posts: PostWithLikedAndCount[] }>()
);

//add post
export const sendRequestToAddPost = createAction(
  '[User Post] Send Request To Add User Post',
  props<{ postInsert: PostInsertDto }>()
);

export const getResponseToAddPost = createAction(
  '[User Post] Get Response For Adding User Post',
  props<{ post: PostGetDto }>()
);

//delete post
export const sendRequestToDeletePost = createAction(
  '[User Post] Send Request To Delete User Post',
  props<{ postId: number }>()
);

export const getResponseToDeletePost = createAction(
  '[User Post] Get Response For Deleting User Post',
  props<{ postId: number }>()
);

//Like and Unlike Post
export const sendRequestToLikePost = createAction(
  '[User Post] Send Request To Like Post',
  props<{ userId: number; postId: number }>()
);

export const getResponseToLikePost = createAction(
  '[User Post] Get Response To Like Post',
  props<{ userId: number; postId: number }>()
);

export const sendRequestToUnlikePost = createAction(
  '[User Post] Send Request To Unlike Post',
  props<{ userId: number; postId: number }>()
);

export const getResponseToUnlikePost = createAction(
  '[User Post] Get Response To Unlike Post',
  props<{ userId: number; postId: number }>()
);

export const getError = createAction(
  '[User Post] Get Error',
  props<{ error: string }>()
);
