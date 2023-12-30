import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkStatusToastComponent } from './network-status-toast.component';

describe('NetworkStatusToastComponent', () => {
  let component: NetworkStatusToastComponent;
  let fixture: ComponentFixture<NetworkStatusToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkStatusToastComponent]
    });
    fixture = TestBed.createComponent(NetworkStatusToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
