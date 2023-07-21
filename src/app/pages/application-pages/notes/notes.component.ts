import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/core/globals/globals.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { iNote } from 'src/app/interface/model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private globals: GlobalsService
  ) {}

  openForm = false;
  notes: iNote[] = [];

  ngOnInit(): void {
    this.getNotes();
  }

  async getNotes() {
    try {
      const storedNotes = (await this.storage.getItems('notes')) as any;
      this.notes = [...this.notes, ...storedNotes];
    } catch (e) {}
  }

  createNote(noteCreated: boolean) {
    if (noteCreated) this.openForm = false;
  }

  openNoteForm() {
    this.openForm = true;
  }

  cancel(formCanceled: boolean) {
    if (formCanceled) this.openForm = false;
  }

  toggleFocusedNoteOption(focusedNote: iNote) {
    this.notes = this.notes.map((note: iNote) =>
      note.id !== focusedNote.id && note.noteOptionToggled
        ? ((note.noteOptionToggled = false), note)
        : note
    );
  }

  focusNote(focusedNote: iNote) {
    focusedNote.noteIsFocused = true;
    this.notes = this.notes.filter((note: iNote) =>
      note.id !== focusedNote.id && note.noteIsFocused
        ? ((note.noteIsFocused = false), note)
        : note
    );
  }

  delete(selectedNote: iNote) {
    this.notes = this.notes.filter(
      (note: iNote) => note.id !== selectedNote.id
    );
    this.storage.saveItem('notes', this.notes);
  }
}
