import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavbarTabComponent } from './side-navbar-tab.component';

describe('SideNavbarTabComponent', () => {
  let component: SideNavbarTabComponent;
  let fixture: ComponentFixture<SideNavbarTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavbarTabComponent]
    });
    fixture = TestBed.createComponent(SideNavbarTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
