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

      await this.saveNote(note);
    } catch (e) {
      throw e;
    }
  }

  public async getNotes() {
    try {
      this.notes = (await this.storage.getItems('notes')) as INote[];
    } catch (e) {
      throw Error('ERROR at getNotes');
    }
  }

  public async getNote(noteId: string): Promise<INote | undefined> {
    await this.getNotes();

    return this.notes.find((note: INote) => {
      return noteId === note.id;
    });
  }

  public async saveNote(note: INote) {
    this.storage.saveItem('notes', note);
    await this.getNotes();
  }

  public async deleteNote(noteId: string) {
    await this.getNotes();

    const filteredNotes = this.notes.filter(
      (note: INote) => note.id !== noteId
    );
    this.storage.saveItem('notes', filteredNotes);
    await this.getNotes();
  }
}
