import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabCommentAddDialogComponent } from './myprofile-tab-comment-add-dialog.component';

describe('MyprofileTabCommentAddDialogComponent', () => {
  let component: MyprofileTabCommentAddDialogComponent;
  let fixture: ComponentFixture<MyprofileTabCommentAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabCommentAddDialogComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabCommentAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
