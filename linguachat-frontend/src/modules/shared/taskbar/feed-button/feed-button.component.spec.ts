import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedButtonComponent } from './feed-button.component';

describe('FeedButtonComponent', () => {
  let component: FeedButtonComponent;
  let fixture: ComponentFixture<FeedButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedButtonComponent]
    });
    fixture = TestBed.createComponent(FeedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
