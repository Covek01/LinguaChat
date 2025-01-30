import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabUserInfoComponent } from './myprofile-tab-user-info.component';

describe('MyprofileTabUserInfoComponent', () => {
  let component: MyprofileTabUserInfoComponent;
  let fixture: ComponentFixture<MyprofileTabUserInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabUserInfoComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
