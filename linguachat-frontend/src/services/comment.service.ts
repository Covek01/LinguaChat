import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentGetDto, CommentInsertDto, CommentInterface } from 'src/models/comment.types';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseAddress: string;
  private basePath: string;

  constructor(private http: HttpClient) {
    this.baseAddress = environment.postgresAddress;
    this.basePath = 'comment'; // Adjust path as needed
  }

  addComment(comment: CommentInsertDto): Observable<CommentGetDto> {
    return this.http.post<CommentGetDto>(
      `${this.baseAddress}/${this.basePath}/add`,
      comment
    );
  }

  getComment(id: number): Observable<CommentGetDto> {
    return this.http.get<CommentGetDto>(
      `${this.baseAddress}/${this.basePath}/get/${id}`
    );
  }

  updateComment(comment: CommentInterface): Observable<CommentGetDto> {
    return this.http.put<CommentGetDto>(
      `${this.baseAddress}/${this.basePath}/update`,
      comment
    );
  }

  deleteComment(id: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseAddress}/${this.basePath}/delete/${id}`
    );
  }

  getCommentsOfPost(postId: number): Observable<CommentGetDto[]> {
    return this.http.get<CommentGetDto[]>(
      `${this.baseAddress}/${this.basePath}/getCommentsOfPost/${postId}`
    );
  }
}
