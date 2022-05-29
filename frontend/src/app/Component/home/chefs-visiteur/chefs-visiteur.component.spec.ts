import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefsVisiteurComponent } from './chefs-visiteur.component';

describe('ChefsVisiteurComponent', () => {
  let component: ChefsVisiteurComponent;
  let fixture: ComponentFixture<ChefsVisiteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefsVisiteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefsVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
