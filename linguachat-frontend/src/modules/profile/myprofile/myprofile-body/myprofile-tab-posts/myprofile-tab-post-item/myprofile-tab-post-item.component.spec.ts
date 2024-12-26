import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabPostItemComponent } from './myprofile-tab-post-item.component';

describe('MyprofileTabPostItemComponent', () => {
  let component: MyprofileTabPostItemComponent;
  let fixture: ComponentFixture<MyprofileTabPostItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabPostItemComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
