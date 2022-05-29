import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefDeLaSemaineComponent } from './chef-de-semaine.component';

describe('ChefDeSemaineComponent', () => {
  let component: ChefDeLaSemaineComponent;
  let fixture: ComponentFixture<ChefDeLaSemaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefDeLaSemaineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefDeLaSemaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
