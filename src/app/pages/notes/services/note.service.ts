import {
  Injectable,
  WritableSignal,
  signal,
  effect,
  Signal,
  computed,
} from '@angular/core';
import { GlobalsService } from 'src/app/core/globals.service';
import { StorageService } from 'src/app/core/storage.service';
import { IAuthor, INote } from 'src/app/interface/note';

@Injectable()
export class NoteService {
  constructor(private storage: StorageService, private global: GlobalsService) {
    this.getNotes();
    effect(() => {
      this.saveNotes();
    });
  }

  public notes: WritableSignal<Array<INote | IAuthor>> = signal([]);
  public openFullScreen = false;
  public pinnedNotes: Array<INote | IAuthor> = [];
  public pinned = false;

  public createNote(
    formEntries: Pick<INote, 'title' | 'tags'>
  ): string | Error {
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

      this.notes.update((notes: Array<INote | IAuthor>) => [note, ...notes]);

      if (Boolean(this.pinnedNotes.length)) {
        this.notes.update(
          this.stackPinnedNotes_getNewArrangementOfNotes.bind(this)
        );
      }

      return id;
    } catch (e) {
      throw e;
    }
  }

  pinNote(note: INote | IAuthor) {
    this.pinnedNotes.unshift(note);
    this.notes.update(
      this.stackPinnedNotes_getNewArrangementOfNotes.bind(this)
    );
  }

  unpinNote(noteId: string) {
    this.pinnedNotes = this.pinnedNotes.filter(
      (note: INote | IAuthor) => note.id !== noteId
    );

    this.notes.update((notes) =>
      this.unstackUnpinnedNote_getNewArrangementOfNotes.call(
        this,
        noteId,
        notes
      )
    );
  }

  // Stacks pinned notes at the beginning of the notes array.
  //@returns a new arrangement of notes.
  stackPinnedNotes_getNewArrangementOfNotes(
    notes: Array<INote | IAuthor>
  ): Array<INote | IAuthor> {
    const mapIndex: Record<string, number> = {};

    // Mapping the index of pinned note in notes
    notes.forEach((note: INote | IAuthor, index: number) => {
      this.pinnedNotes.forEach((pinnedNote: INote | IAuthor) => {
        if (pinnedNote.id === note.id)
          // Get pinned note id and map it to its index
          mapIndex[note.id] = index;
      });
    });

    // Filtering out pinned notes from notes
    const unpinnedNotes = notes.filter(
      (note: INote | IAuthor) => !mapIndex.hasOwnProperty(note.id)
    ) satisfies Array<INote | IAuthor>;

    // Indexes of pinned notes in notes
    const indexes = Object.values(mapIndex) satisfies Array<number>;
    const sortedIndexes = indexes.sort(
      (min: number, max: number) => min - max
    ) satisfies Array<number>;

    // Starting from the end of the sortedIndexes array, pick each note
    // and prepend it to the begining of unpinnedNotes array.
    for (let index = 0; index < sortedIndexes.length; index++) {
      unpinnedNotes.unshift(notes[sortedIndexes[index]]);
    }

    return unpinnedNotes;
  }

  // Pushes unpinned note to the end of the notes array.
  unstackUnpinnedNote_getNewArrangementOfNotes(
    unpinnedNoteId: string,
    notes: Array<INote | IAuthor>
  ): Array<INote | IAuthor> {
    const unpinnedNote = notes.find(
      (note: INote | IAuthor) => note.id === unpinnedNoteId
    ) satisfies INote | IAuthor | undefined;

    const filteredNote = notes.filter(
      (note: INote | IAuthor) => note.id !== unpinnedNoteId
    ) satisfies Array<INote | IAuthor>;

    filteredNote.push(unpinnedNote as INote | IAuthor);
    return filteredNote;
  }

  public getNotes() {
    let savedNotes = this.storage.getItems('notes') satisfies Array<
      INote | IAuthor
    >;
    this.notes.set(savedNotes);
  }

  public getNote(noteId: string): INote | IAuthor | undefined {
    if (this.notes().length) {
      return this.notes().find((note: INote | IAuthor) => {
        return noteId === note.id;
      });
    }
    return undefined;
  }

  public saveNotes() {
    this.storage.saveItem('notes', this.notes());
  }

  public saveEditedNote(editedNote: INote) {
    const unEditedNotes = this.notes().filter((note: INote | IAuthor) => {
      return note.id !== editedNote.id;
    }) satisfies Array<INote | IAuthor>;

    this.notes.update(() => [editedNote, ...unEditedNotes]);

    if (Boolean(this.pinnedNotes.length)) {
      this.notes.update(
        this.stackPinnedNotes_getNewArrangementOfNotes.bind(this)
      );
    }
  }

  public deleteNote(noteId: string) {
    const filteredNotes = this.notes().filter(
      (note: INote) => note.id !== noteId
    );

    this.notes.update(() => [...filteredNotes]);
  }
}
