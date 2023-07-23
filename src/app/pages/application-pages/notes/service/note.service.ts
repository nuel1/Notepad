import { Injectable } from '@angular/core';
import { GlobalsService } from 'src/app/core/globals/globals.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { INote } from 'src/app/interface/model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(
    private storage: StorageService,
    private global: GlobalsService
  ) {}

  async createNote(tags: string[], title: string) {
    try {
      const id = this.global.getNewId();
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
      return decryptedNoteId === decryptedId;
    });
  }

  async deleteNote(noteId: string) {
    const notes = await this.getNotes();

    const filteredNotes = notes.filter((note: INote) => note.id !== noteId);
    this.storage.saveItem('notes', filteredNotes);
  }
}
