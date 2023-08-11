import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePreviewerComponent } from './note-previewer.component';

describe('NotePreviewerComponent', () => {
  let component: NotePreviewerComponent;
  let fixture: ComponentFixture<NotePreviewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotePreviewerComponent]
    });
    fixture = TestBed.createComponent(NotePreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
