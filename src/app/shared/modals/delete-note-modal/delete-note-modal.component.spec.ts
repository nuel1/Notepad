import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoteModalComponent } from './delete-note-modal.component';

describe('DeleteNoteModalComponent', () => {
  let component: DeleteNoteModalComponent;
  let fixture: ComponentFixture<DeleteNoteModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteNoteModalComponent]
    });
    fixture = TestBed.createComponent(DeleteNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
