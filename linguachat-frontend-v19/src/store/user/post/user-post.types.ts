import { EntityState } from '@ngrx/entity';
import { PostInterface, PostWithLikedAndCount } from 'src/models/post.types';

export interface PostWithLikeInterface extends PostInterface {
  liked: boolean;
  likedCount: number;
}

export interface PostsState
  extends EntityState<PostWithLikedAndCount> {}
