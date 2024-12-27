import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabCommentsItemComponent } from './myprofile-tab-comments-item.component';

describe('MyprofileTabCommentsItemComponent', () => {
  let component: MyprofileTabCommentsItemComponent;
  let fixture: ComponentFixture<MyprofileTabCommentsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabCommentsItemComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabCommentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
