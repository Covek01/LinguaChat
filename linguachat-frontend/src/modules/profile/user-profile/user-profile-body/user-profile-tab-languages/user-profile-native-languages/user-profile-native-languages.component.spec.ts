import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileNativeLanguagesComponent } from './user-profile-native-languages.component';

describe('UserProfileNativeLanguagesComponent', () => {
  let component: UserProfileNativeLanguagesComponent;
  let fixture: ComponentFixture<UserProfileNativeLanguagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileNativeLanguagesComponent]
    });
    fixture = TestBed.createComponent(UserProfileNativeLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
