import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Post,
  PostGetDto,
  PostInsertDto,
  PostUpdateDto,
  PostWithLikedAndCount,
} from 'src/models/post.types';
import { emptyProps } from '@ngrx/store';
import { NgTemplateOutlet } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseAddress: string;
  private basePath: string;

  constructor(private http: HttpClient) {
    this.baseAddress = environment.postgresAddress;
    this.basePath = 'post'; // Adjust path as needed
  }

  addPost(post: PostInsertDto): Observable<PostGetDto> {
    return this.http.post<PostGetDto>(
      `${this.baseAddress}/${this.basePath}/add`,
      post
    );
  }

  getPost(id: number): Observable<PostGetDto> {
    return this.http.get<PostGetDto>(
      `${this.baseAddress}/${this.basePath}/get/${id}`
    );
  }

  updatePost(post: PostUpdateDto): Observable<PostGetDto> {
    return this.http.put<PostGetDto>(
      `${this.baseAddress}/${this.basePath}/update`,
      post
    );
  }

  deletePost(id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseAddress}/${this.basePath}/delete/${id}`
    );
  }

  getPostsOfUser(userId: number): Observable<PostGetDto[]> {
    return this.http.get<PostGetDto[]>(
      `${this.baseAddress}/${this.basePath}/getPostsOfUser/${userId}`
    );
  }

  getPostsOfMe(userId: number): Observable<PostGetDto[]> {
    return this.http.get<PostGetDto[]>(
      `${this.baseAddress}/${this.basePath}/getPostsOfMe`
    );
  }

  getPostsOfUserWithLikedStatus(
    userId: number
  ): Observable<PostWithLikedAndCount[]> {
    return this.http.get<PostWithLikedAndCount[]>(
      `${this.baseAddress}/${this.basePath}/getPostsOfUserWithLikedStatus/${userId}`
    );
  }

  getPostsOfUserWithLikedStatusByMe(): Observable<PostWithLikedAndCount[]> {
    return this.http.get<PostWithLikedAndCount[]>(
      `${this.baseAddress}/${this.basePath}/getPostsWithLikedStatusByMe`
    );
  }

  likePost(
    userId: number,
    postId: number
  ): Observable<string> {
    return this.http.put(
      `${this.baseAddress}/${this.basePath}/likePost/${userId}/${postId}`,
      null,
      {
        responseType: 'text'
      }
    );
  }

  unlikePost(
    userId: number,
    postId: number
  ): Observable<string> {
    return this.http.put(
      `${this.baseAddress}/${this.basePath}/unlikePost/${userId}/${postId}`,
      null,
      {
        responseType: 'text'
      }
    );
  }

  getPostsOfConnectedUsersWithLikedStatusByMe(
    limit: number,
    offset: number
  ): Observable<PostWithLikedAndCount[]> {
    return this.http.get<PostWithLikedAndCount[]>(
      `${this.baseAddress}/${this.basePath}/getPostsOfConnectedUsersWithLikedStatusByMe/${limit}/${offset}`,
    );
  }
}
