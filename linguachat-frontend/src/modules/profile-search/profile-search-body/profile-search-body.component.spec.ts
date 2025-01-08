import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearchBodyComponent } from './profile-search-body.component';

describe('ProfileSearchBodyComponent', () => {
  let component: ProfileSearchBodyComponent;
  let fixture: ComponentFixture<ProfileSearchBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSearchBodyComponent]
    });
    fixture = TestBed.createComponent(ProfileSearchBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
