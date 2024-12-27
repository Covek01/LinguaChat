import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap } from 'rxjs';
import { PostGetDto } from 'src/models/post.types';
import { selectAllComments } from 'src/store/comment/comment.selector';

@Component({
  selector: 'app-myprofile-tab-comments',
  templateUrl: './myprofile-tab-comments.component.html',
  styleUrls: ['./myprofile-tab-comments.component.sass'],
})
export class MyprofileTabCommentsComponent {
  @Input() post: PostGetDto | null = null;
  constructor(private readonly store: Store, private dialog: MatDialog) {}
  commentsOfPost$ = this.store
    .select(selectAllComments)
    .pipe(
      map((comments) =>
        comments.filter((comment) => comment.postRelatedTo.id === this.post?.id)
      )
    );
}
