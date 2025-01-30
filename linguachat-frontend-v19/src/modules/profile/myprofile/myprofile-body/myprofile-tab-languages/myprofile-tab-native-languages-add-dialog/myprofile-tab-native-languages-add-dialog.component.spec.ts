import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabNativeLanguagesAddDialogComponent } from './myprofile-tab-native-languages-add-dialog.component';

describe('MyprofileTabNativeLanguagesAddDialogComponent', () => {
  let component: MyprofileTabNativeLanguagesAddDialogComponent;
  let fixture: ComponentFixture<MyprofileTabNativeLanguagesAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabNativeLanguagesAddDialogComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabNativeLanguagesAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
