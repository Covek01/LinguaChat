import { Component, Input } from '@angular/core';
import { UserGetDto } from 'src/models/user.types';

@Component({
  selector: 'app-myprofile-barleft-item',
  templateUrl: './myprofile-barleft-item.component.html',
  styleUrls: ['./myprofile-barleft-item.component.sass'],
})
export class MyprofileBarleftItemComponent {
  @Input() user: UserGetDto = new UserGetDto();

}
