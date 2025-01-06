import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileLearningLanguagesComponent } from './user-profile-learning-languages.component';

describe('UserProfileLearningLanguagesComponent', () => {
  let component: UserProfileLearningLanguagesComponent;
  let fixture: ComponentFixture<UserProfileLearningLanguagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileLearningLanguagesComponent]
    });
    fixture = TestBed.createComponent(UserProfileLearningLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
