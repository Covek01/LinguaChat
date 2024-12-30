import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabLearningLanguagesComponent } from './myprofile-tab-learning-languages.component';

describe('MyprofileTabLearningLanguagesComponent', () => {
  let component: MyprofileTabLearningLanguagesComponent;
  let fixture: ComponentFixture<MyprofileTabLearningLanguagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabLearningLanguagesComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabLearningLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
