import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserGetDto } from 'src/models/user.types';
import { selectMyUser, selectUser } from 'src/store/user/user-data/user-data.selector';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.sass'],
})
export class ChatBoxComponent implements OnDestroy {
  public messageForm: FormGroup;
  public myUserInfo: UserGetDto | null = null;

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


  myDataSubscription$ = this.store.select(selectMyUser).subscribe(user => {
    this.myUserInfo = user;
  });

  ngOnDestroy(): void {
    this.myDataSubscription$.unsubscribe()
  }

  sendMessage(receiverId: number): void {
    if (!this.myUserInfo) {
      return;
    }

    const senderId = this.myUserInfo?.id ?? 0;
    

    this.messageForm.reset();
  }
}
