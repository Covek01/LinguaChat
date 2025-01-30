import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileTabUserInfoComponent } from './user-profile-tab-user-info.component';

describe('UserProfileTabUserInfoComponent', () => {
  let component: UserProfileTabUserInfoComponent;
  let fixture: ComponentFixture<UserProfileTabUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileTabUserInfoComponent]
    });
    fixture = TestBed.createComponent(UserProfileTabUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
