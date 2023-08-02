import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { StorageService } from './storage.service';
import { INote } from 'src/app/interface/note';

@Injectable()
export class NoteService {
  constructor(
    private storage: StorageService,
    private global: GlobalsService
  ) {}

  public notes: INote[] = [];

  public createNote(formEntry: { title: string; tags: string[] }) {
    try {
      const id = this.global.generateId();
      const date = this.global.date;
      const note = {
        title: formEntry.title,
        id: id,
        date: date,
        tags: formEntry.tags,
        content: '',
      };

      this.notes = [...this.notes, note];
      this.saveNotes();
    } catch (e) {
      throw e;
    }
  }

  public getNotes() {
    this.notes = this.storage.getItems('notes');
  }

  public getNote(noteId: string): INote | undefined {
    this.getNotes();

    if (this.notes.length) {
      return this.notes.find((note: INote) => {
        return noteId === note.id;
      });
    }
    return undefined;
  }

  public saveNotes() {
    this.storage.saveItem('notes', this.notes);
    this.getNotes();
  }

  public saveupdatedNote(note: INote) {
    this.notes.forEach(
      (storedNote: INote, index: number) =>
        storedNote.id === note.id && (this.notes[index] = note)
    );
    this.saveNotes();
  }

  public deleteNote(noteId: string) {
    const filteredNotes = this.notes.filter(
      (note: INote) => note.id !== noteId
    );

    this.notes = [...filteredNotes];
    this.saveNotes();
    this.getNotes();
  }
}
