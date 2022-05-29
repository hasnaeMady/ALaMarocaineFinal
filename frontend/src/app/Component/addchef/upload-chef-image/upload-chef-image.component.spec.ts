import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadChefImageComponent } from './upload-chef-image.component';

describe('UploadChefImageComponent', () => {
  let component: UploadChefImageComponent;
  let fixture: ComponentFixture<UploadChefImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadChefImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadChefImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
