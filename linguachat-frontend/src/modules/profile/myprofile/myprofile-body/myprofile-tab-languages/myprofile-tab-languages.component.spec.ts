import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabLanguagesComponent } from './myprofile-tab-languages.component';

describe('MyprofileTabLanguagesComponent', () => {
  let component: MyprofileTabLanguagesComponent;
  let fixture: ComponentFixture<MyprofileTabLanguagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabLanguagesComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
