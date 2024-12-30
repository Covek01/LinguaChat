import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabNativeLanguagesComponent } from './myprofile-tab-native-languages.component';

describe('MyprofileTabNativeLanguagesComponent', () => {
  let component: MyprofileTabNativeLanguagesComponent;
  let fixture: ComponentFixture<MyprofileTabNativeLanguagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabNativeLanguagesComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabNativeLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
