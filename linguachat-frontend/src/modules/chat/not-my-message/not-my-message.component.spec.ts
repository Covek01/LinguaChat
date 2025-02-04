import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotMyMessageComponent } from './not-my-message.component';

describe('NotMyMessageComponent', () => {
  let component: NotMyMessageComponent;
  let fixture: ComponentFixture<NotMyMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotMyMessageComponent]
    });
    fixture = TestBed.createComponent(NotMyMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
