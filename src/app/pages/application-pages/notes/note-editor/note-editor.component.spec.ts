import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditorComponent } from './note-editor.component';

describe('NoteEditorComponent', () => {
  let component: NoteEditorComponent;
  let fixture: ComponentFixture<NoteEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteEditorComponent]
    });
    fixture = TestBed.createComponent(NoteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
