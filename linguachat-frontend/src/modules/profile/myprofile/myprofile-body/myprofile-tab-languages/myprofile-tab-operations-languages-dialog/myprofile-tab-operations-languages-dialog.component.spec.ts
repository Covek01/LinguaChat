import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabOperationsLanguagesDialogComponent } from './myprofile-tab-operations-languages-dialog.component';

describe('MyprofileTabOperationsLanguagesDialogComponent', () => {
  let component: MyprofileTabOperationsLanguagesDialogComponent;
  let fixture: ComponentFixture<MyprofileTabOperationsLanguagesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabOperationsLanguagesDialogComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabOperationsLanguagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
