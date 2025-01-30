import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabCommentAddComponent } from './myprofile-tab-comment-add.component';

describe('MyprofileTabCommentAddComponent', () => {
  let component: MyprofileTabCommentAddComponent;
  let fixture: ComponentFixture<MyprofileTabCommentAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabCommentAddComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabCommentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
