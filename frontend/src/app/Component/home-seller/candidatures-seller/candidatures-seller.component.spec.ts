import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturesSellerComponent } from './candidatures-seller.component';

describe('CandidaturesSellerComponent', () => {
  let component: CandidaturesSellerComponent;
  let fixture: ComponentFixture<CandidaturesSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidaturesSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidaturesSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
