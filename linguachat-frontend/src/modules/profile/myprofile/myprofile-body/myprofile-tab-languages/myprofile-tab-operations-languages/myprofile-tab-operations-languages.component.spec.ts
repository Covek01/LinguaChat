import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabOperationsLanguagesComponent } from './myprofile-tab-operations-languages.component';

describe('MyprofileTabOperationsLanguagesComponent', () => {
  let component: MyprofileTabOperationsLanguagesComponent;
  let fixture: ComponentFixture<MyprofileTabOperationsLanguagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabOperationsLanguagesComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabOperationsLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
