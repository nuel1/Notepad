import { Injectable } from '@angular/core';
import { GlobalsService } from 'src/app/core/globals.service';
import { StorageService } from 'src/app/core/storage.service';
import { IAuthor, INote } from 'src/app/interface/note';

@Injectable()
export class NoteService {
  constructor(
    private storage: StorageService,
    private global: GlobalsService
  ) {}

  public notes: Array<INote | IAuthor> = [];
  public openFullScreen = false;

  public createNote(formEntries: { title: string; tags: string[] }) {
    try {
      const id = this.global.generateId();
      const date = this.global.date;
      const note = {
        title: formEntries.title,
        id: id,
        date: date,
        tags: formEntries.tags,
        content: '',
      } satisfies INote;

      this.notes = [...this.notes, note];
      this.saveNotes();

      return id;
    } catch (e) {
      throw e;
    }
  }

  public getNotes() {
    this.notes = this.storage.getItems('notes') satisfies Array<
      INote | IAuthor
    >;
  }

  public getNote(noteId: string): INote | IAuthor | undefined {
    this.getNotes();

    if (this.notes.length) {
      return this.notes.find((note: INote | IAuthor) => {
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
