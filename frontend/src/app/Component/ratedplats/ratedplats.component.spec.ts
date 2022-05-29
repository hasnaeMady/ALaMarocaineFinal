import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedplatsComponent } from './ratedplats.component';

describe('RatedbooksComponent', () => {
  let component: RatedplatsComponent;
  let fixture: ComponentFixture<RatedplatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedplatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedplatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
