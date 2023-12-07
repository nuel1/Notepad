import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabButtonComponent } from './fab-button.component';

describe('FabButtonComponent', () => {
  let component: FabButtonComponent;
  let fixture: ComponentFixture<FabButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FabButtonComponent]
    });
    fixture = TestBed.createComponent(FabButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
