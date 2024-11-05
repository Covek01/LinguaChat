import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileBodyComponent } from './myprofile-body.component';

describe('MyprofileBodyComponent', () => {
  let component: MyprofileBodyComponent;
  let fixture: ComponentFixture<MyprofileBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileBodyComponent]
    });
    fixture = TestBed.createComponent(MyprofileBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
