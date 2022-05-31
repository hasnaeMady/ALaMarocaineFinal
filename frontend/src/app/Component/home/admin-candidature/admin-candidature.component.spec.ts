import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCandidatureComponent } from './admin-candidature.component';

describe('AdminCandidatureComponent', () => {
  let component: AdminCandidatureComponent;
  let fixture: ComponentFixture<AdminCandidatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCandidatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCandidatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
