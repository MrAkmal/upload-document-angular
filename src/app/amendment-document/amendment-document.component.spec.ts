import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmendmentDocumentComponent } from './amendment-document.component';

describe('AmendmentDocumentComponent', () => {
  let component: AmendmentDocumentComponent;
  let fixture: ComponentFixture<AmendmentDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmendmentDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmendmentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
