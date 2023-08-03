import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFormInputErrorComponent } from './note-form-input-error.component';

describe('NoteFormInputErrorComponent', () => {
  let component: NoteFormInputErrorComponent;
  let fixture: ComponentFixture<NoteFormInputErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteFormInputErrorComponent]
    });
    fixture = TestBed.createComponent(NoteFormInputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
