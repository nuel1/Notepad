import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteEditorFullscreenComponent } from './note-editor-fullscreen.component';

describe('NoteEditorFullscreenComponent', () => {
  let component: NoteEditorFullscreenComponent;
  let fixture: ComponentFixture<NoteEditorFullscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteEditorFullscreenComponent]
    });
    fixture = TestBed.createComponent(NoteEditorFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
