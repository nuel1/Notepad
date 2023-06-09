import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationPagesComponent } from './application-pages.component';

describe('ApplicationPagesComponent', () => {
  let component: ApplicationPagesComponent;
  let fixture: ComponentFixture<ApplicationPagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationPagesComponent]
    });
    fixture = TestBed.createComponent(ApplicationPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
