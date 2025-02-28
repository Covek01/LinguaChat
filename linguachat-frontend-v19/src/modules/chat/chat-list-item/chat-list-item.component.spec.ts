import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatListItemComponent } from './chat-list-item.component';

describe('ChatListItemComponent', () => {
  let component: ChatListItemComponent;
  let fixture: ComponentFixture<ChatListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatListItemComponent]
    });
    fixture = TestBed.createComponent(ChatListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
