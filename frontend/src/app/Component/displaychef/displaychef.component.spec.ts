import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaychefComponent } from './displaychef.component';

describe('DisplaychefComponent', () => {
  let component: DisplaychefComponent;
  let fixture: ComponentFixture<DisplaychefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaychefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaychefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
