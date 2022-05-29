import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatreviewsComponent } from './platreviews.component';

describe('PlatreviewsComponent', () => {
  let component: PlatreviewsComponent;
  let fixture: ComponentFixture<PlatreviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatreviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
