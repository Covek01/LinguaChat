import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CommentGetDto } from 'src/models/comment.types';
import { PostGetDto } from 'src/models/post.types';
import { selectAllComments } from 'src/store/comment/comment.selector';

@Component({
  selector: 'app-myprofile-tab-comments',
  templateUrl: './myprofile-tab-comments.component.html',
  styleUrls: ['./myprofile-tab-comments.component.sass'],
})
export class MyprofileTabCommentsComponent {
  @Input() post: PostGetDto | null = null;
  constructor(private readonly store: Store) {}
  public commentsOfPost$ = this.store
    .select(selectAllComments)
    .pipe(
      map((comments: CommentGetDto[]): CommentGetDto[] =>
        comments.filter((comment: CommentGetDto) => comment.postRelatedTo.id === this.post?.id)
      )
    );
}
