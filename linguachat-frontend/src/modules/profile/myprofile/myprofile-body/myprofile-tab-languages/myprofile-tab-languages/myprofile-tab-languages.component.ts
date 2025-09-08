import { Component, Input } from '@angular/core';
import { Role } from 'src/models/role.types';
import { UserGetDto } from 'src/models/user.types';

@Component({
  selector: 'app-myprofile-tab-languages',
  templateUrl: './myprofile-tab-languages.component.html',
  styleUrls: ['./myprofile-tab-languages.component.sass'],
})
export class MyprofileTabLanguagesComponent {
  @Input() user: UserGetDto | null = new UserGetDto();

  public checkUserIsAdmin(user: UserGetDto | null): boolean {
    const role: Role = user?.role as Role;
    return role === Role.Admin;
  }
}
