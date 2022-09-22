import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmendmentVersionComponent } from './amendment-version.component';

describe('AmendmentVersionComponent', () => {
  let component: AmendmentVersionComponent;
  let fixture: ComponentFixture<AmendmentVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmendmentVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmendmentVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
