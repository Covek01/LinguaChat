import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabCommentsComponent } from './myprofile-tab-comments.component';

describe('MyprofileTabCommentsComponent', () => {
  let component: MyprofileTabCommentsComponent;
  let fixture: ComponentFixture<MyprofileTabCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabCommentsComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
