import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserGetDto } from 'src/models/user.types';
import { selectUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.sass'],
})
export class ChatBoxComponent {
  public messageForm: FormGroup;

  constructor(
    private readonly store: Store,
    private fb: FormBuilder,
    private readonly router: Router
  ) {
    this.messageForm = this.fb.group({
      text: ['', [Validators.required]],
    });
  }

  userData$: Observable<UserGetDto> = this.store.select(selectUser);

  sendMessage(): void {
    throw new Error('Method not implemented.');
  }
}
