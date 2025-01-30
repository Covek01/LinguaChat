import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabPostsComponent } from './myprofile-tab-posts.component';

describe('MyprofileTabPostsComponent', () => {
  let component: MyprofileTabPostsComponent;
  let fixture: ComponentFixture<MyprofileTabPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabPostsComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
