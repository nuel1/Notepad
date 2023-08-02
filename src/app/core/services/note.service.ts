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

  public async createNote(formEntry: { title: string; tags: string[] }) {
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
      await this.saveNote();
    } catch (e) {
      throw e;
    }
  }

  public getNotes() {
    this.storage
      .getItems('notes')
      .then((notes) => (this.notes = notes as INote[]));
  }

  public async getNote(noteId: string): Promise<INote | undefined> {
    this.getNotes();

    if (this.notes.length) {
      return this.notes.find((note: INote) => {
        return noteId === note.id;
      });
    }
    return undefined;
  }

  public async saveNote() {
    this.storage.saveItem('notes', this.notes);
    this.getNotes();
  }

  public async deleteNote(noteId: string) {
    const filteredNotes = this.notes.filter(
      (note: INote) => note.id !== noteId
    );

    this.notes = [...filteredNotes];
    this.saveNote();
    this.getNotes();
  }
}
