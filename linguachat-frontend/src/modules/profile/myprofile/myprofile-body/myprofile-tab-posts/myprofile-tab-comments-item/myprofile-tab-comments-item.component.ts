import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommentGetDto } from 'src/models/comment.types';
import { PostGetDto } from 'src/models/post.types';

@Component({
  selector: 'app-myprofile-tab-comments-item',
  templateUrl: './myprofile-tab-comments-item.component.html',
  styleUrls: ['./myprofile-tab-comments-item.component.sass'],
})
export class MyprofileTabCommentsItemComponent {
  @Input() comment: CommentGetDto | null = null;
  @Input() post: PostGetDto | null = null;

  constructor(private readonly store: Store) {}
}
