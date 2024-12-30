import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabLearningLanguagesAddDialogComponent } from './myprofile-tab-learning-languages-add-dialog.component';

describe('MyprofileTabLearningLanguagesAddDialogComponent', () => {
  let component: MyprofileTabLearningLanguagesAddDialogComponent;
  let fixture: ComponentFixture<MyprofileTabLearningLanguagesAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabLearningLanguagesAddDialogComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabLearningLanguagesAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
