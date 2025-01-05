import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedUserButtonComponent } from './blocked-user-button.component';

describe('BlockedUserButtonComponent', () => {
  let component: BlockedUserButtonComponent;
  let fixture: ComponentFixture<BlockedUserButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockedUserButtonComponent]
    });
    fixture = TestBed.createComponent(BlockedUserButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
