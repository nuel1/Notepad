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

  async createNote(tags: string[], title: string) {
    try {
      const id = this.global.generateId();
      const encryptedId = this.global.encrypt(String(id));
      const dateCreate = this.global.date;
      const note = {
        title,
        id: encryptedId,
        dateCreate,
        tags,
      };

      await this.storage.saveItem('notes', note);
      return encryptedId;
    } catch (e) {
      throw e;
    }
  }

  async getNotes(): Promise<INote[]> {
    try {
      const notes = (await this.storage.getItems('notes')) as INote[];
      return notes;
    } catch (e) {
      throw e;
    }
  }

  async getNote(noteId: string): Promise<INote | undefined> {
    const notes = await this.getNotes();
    return notes.find((note: INote) => {
      const decryptedId = this.global.decrypt(note.id);
      const decryptedNoteId = this.global.decrypt(noteId);
      // When decrypting none-encrypted string, the returned value is always
      // an empty string. Thus checking if both constants have value.
      if (decryptedId && decryptedNoteId)
        return decryptedNoteId === decryptedId;
      return note.id === noteId;
    });
  }

  async deleteNote(noteId: string) {
    const notes = await this.getNotes();

    const filteredNotes = notes.filter((note: INote) => note.id !== noteId);
    this.storage.saveItem('notes', filteredNotes);
  }
}
