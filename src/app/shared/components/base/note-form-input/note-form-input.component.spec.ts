import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteFormInputComponent } from './note-form-input.component';

describe('NoteFormInputComponent', () => {
  let component: NoteFormInputComponent;
  let fixture: ComponentFixture<NoteFormInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteFormInputComponent]
    });
    fixture = TestBed.createComponent(NoteFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
