import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.sass'],
})
export class MyprofileComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  requestToggleSidenav() {}
}
