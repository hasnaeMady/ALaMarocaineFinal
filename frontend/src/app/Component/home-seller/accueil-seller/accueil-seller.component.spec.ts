import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilSellerComponent } from './accueil-seller.component';

describe('AccueilSellerComponent', () => {
  let component: AccueilSellerComponent;
  let fixture: ComponentFixture<AccueilSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
