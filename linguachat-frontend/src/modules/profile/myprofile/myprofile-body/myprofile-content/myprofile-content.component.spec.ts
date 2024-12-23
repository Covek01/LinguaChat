import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileContentComponent } from './myprofile-content.component';

describe('MyprofileContentComponent', () => {
  let component: MyprofileContentComponent;
  let fixture: ComponentFixture<MyprofileContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileContentComponent]
    });
    fixture = TestBed.createComponent(MyprofileContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
