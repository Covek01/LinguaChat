import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredProfilesComponent } from './filtered-profiles.component';

describe('FilteredProfilesComponent', () => {
  let component: FilteredProfilesComponent;
  let fixture: ComponentFixture<FilteredProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilteredProfilesComponent]
    });
    fixture = TestBed.createComponent(FilteredProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
