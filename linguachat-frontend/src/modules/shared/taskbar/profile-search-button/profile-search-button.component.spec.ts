import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearchButtonComponent } from './profile-search-button.component';

describe('ProfileSearchButtonComponent', () => {
  let component: ProfileSearchButtonComponent;
  let fixture: ComponentFixture<ProfileSearchButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSearchButtonComponent]
    });
    fixture = TestBed.createComponent(ProfileSearchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
