import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileTabLanguagesComponent } from './user-profile-tab-languages.component';

describe('UserProfileTabLanguagesComponent', () => {
  let component: UserProfileTabLanguagesComponent;
  let fixture: ComponentFixture<UserProfileTabLanguagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileTabLanguagesComponent]
    });
    fixture = TestBed.createComponent(UserProfileTabLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
