import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileUpdateDialogComponent } from './myprofile-update-dialog.component';

describe('MyprofileUpdateDialogComponent', () => {
  let component: MyprofileUpdateDialogComponent;
  let fixture: ComponentFixture<MyprofileUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileUpdateDialogComponent]
    });
    fixture = TestBed.createComponent(MyprofileUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
