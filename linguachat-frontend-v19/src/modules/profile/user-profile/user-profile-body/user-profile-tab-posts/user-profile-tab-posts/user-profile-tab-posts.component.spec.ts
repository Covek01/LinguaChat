import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileTabPostsComponent } from './user-profile-tab-posts.component';

describe('UserProfileTabPostsComponent', () => {
  let component: UserProfileTabPostsComponent;
  let fixture: ComponentFixture<UserProfileTabPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileTabPostsComponent]
    });
    fixture = TestBed.createComponent(UserProfileTabPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
