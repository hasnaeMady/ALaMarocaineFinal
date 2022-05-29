import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPlatImageComponent } from './upload-plat-image.component';

describe('UploadPlatImageComponent', () => {
  let component: UploadPlatImageComponent;
  let fixture: ComponentFixture<UploadPlatImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPlatImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPlatImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
