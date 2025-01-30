import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileBarleftItemComponent } from './myprofile-barleft-item.component';

describe('MyprofileBarleftItemComponent', () => {
  let component: MyprofileBarleftItemComponent;
  let fixture: ComponentFixture<MyprofileBarleftItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileBarleftItemComponent]
    });
    fixture = TestBed.createComponent(MyprofileBarleftItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
