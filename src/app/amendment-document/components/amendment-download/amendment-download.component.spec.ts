import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmendmentDownloadComponent } from './amendment-download.component';

describe('AmendmentDownloadComponent', () => {
  let component: AmendmentDownloadComponent;
  let fixture: ComponentFixture<AmendmentDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmendmentDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmendmentDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
