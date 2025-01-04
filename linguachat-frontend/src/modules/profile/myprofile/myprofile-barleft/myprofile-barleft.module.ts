import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyprofileBarleftItemComponent } from './myprofile-barleft-item/myprofile-barleft-item.component';
import { MyprofileBarleftComponent } from './myprofile-barleft/myprofile-barleft.component';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [MyprofileBarleftItemComponent, MyprofileBarleftComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [MyprofileBarleftComponent, MyprofileBarleftItemComponent],
})
export class MyprofileBarleftModule {}
