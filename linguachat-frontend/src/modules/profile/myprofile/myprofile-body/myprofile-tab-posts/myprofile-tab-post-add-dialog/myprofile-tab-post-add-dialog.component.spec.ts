import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTabPostAddDialogComponent } from './myprofile-tab-post-add-dialog.component';

describe('MyprofileTabPostAddDialogComponent', () => {
  let component: MyprofileTabPostAddDialogComponent;
  let fixture: ComponentFixture<MyprofileTabPostAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyprofileTabPostAddDialogComponent]
    });
    fixture = TestBed.createComponent(MyprofileTabPostAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
