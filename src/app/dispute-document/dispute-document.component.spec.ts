import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeDocumentComponent } from './dispute-document.component';

describe('DisputeDocumentComponent', () => {
  let component: DisputeDocumentComponent;
  let fixture: ComponentFixture<DisputeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisputeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisputeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
