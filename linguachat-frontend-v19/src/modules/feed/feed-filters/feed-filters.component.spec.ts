import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedFiltersComponent } from './feed-filters.component';

describe('FeedFiltersComponent', () => {
  let component: FeedFiltersComponent;
  let fixture: ComponentFixture<FeedFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedFiltersComponent]
    });
    fixture = TestBed.createComponent(FeedFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
