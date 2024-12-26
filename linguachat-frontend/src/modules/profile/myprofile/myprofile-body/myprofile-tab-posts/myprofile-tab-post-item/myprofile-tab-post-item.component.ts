import { Component, Input } from '@angular/core';
import { PostWithLikedAndCount } from 'src/models/post.types';

@Component({
  selector: 'app-myprofile-tab-post-item',
  templateUrl: './myprofile-tab-post-item.component.html',
  styleUrls: ['./myprofile-tab-post-item.component.sass']
})
export class MyprofileTabPostItemComponent {
 @Input() post: PostWithLikedAndCount | null = null;
}
