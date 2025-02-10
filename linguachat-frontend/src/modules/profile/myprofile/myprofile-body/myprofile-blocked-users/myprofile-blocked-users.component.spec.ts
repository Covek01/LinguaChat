import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileBlockedUsersComponent } from './myprofile-blocked-users.component';

describe('MyprofileBlockedUsersComponent', () => {
  let component: MyprofileBlockedUsersComponent;
  let fixture: ComponentFixture<MyprofileBlockedUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileBlockedUsersComponent]
    });
    fixture = TestBed.createComponent(MyprofileBlockedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
