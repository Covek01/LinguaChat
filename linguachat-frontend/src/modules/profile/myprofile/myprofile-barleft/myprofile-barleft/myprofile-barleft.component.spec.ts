import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileBarleftComponent } from './myprofile-barleft.component';

describe('MyprofileBarleftComponent', () => {
  let component: MyprofileBarleftComponent;
  let fixture: ComponentFixture<MyprofileBarleftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileBarleftComponent]
    });
    fixture = TestBed.createComponent(MyprofileBarleftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
