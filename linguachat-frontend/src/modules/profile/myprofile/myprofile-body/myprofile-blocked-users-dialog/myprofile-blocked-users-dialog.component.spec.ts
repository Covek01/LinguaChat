import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileBlockedUsersDialogComponent } from './myprofile-blocked-users-dialog.component';

describe('MyprofileBlockedUsersDialogComponent', () => {
  let component: MyprofileBlockedUsersDialogComponent;
  let fixture: ComponentFixture<MyprofileBlockedUsersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileBlockedUsersDialogComponent]
    });
    fixture = TestBed.createComponent(MyprofileBlockedUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
