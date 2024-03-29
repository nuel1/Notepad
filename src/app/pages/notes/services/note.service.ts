import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Injectable,
  WritableSignal,
  signal,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { GlobalsService } from 'src/app/core/globals.service';
import { StorageService } from 'src/app/core/storage.service';
import { edenAPI } from 'src/app/environment/environment';
import { IAuthor, ICreateNote, INote } from 'src/app/interface/note';
import { IEdenAPIAudio, IEdentAPIData } from '../interface/note.model';

@Injectable()
export class NoteService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    authorization: edenAPI.apiKey,
  }); 

  url = edenAPI.url;

  constructor(
    private storage: StorageService,
    private global: GlobalsService,
    private router: Router,
    private http: HttpClient
  ) {
    this.getPinnedNotes().getNotes();

    effect(() => {
      this.saveNotes();
      this.savePinnedNotes();
    });
  }

  public readonly notes: WritableSignal<Array<INote | IAuthor>> = signal([]);
  public readonly pinnedNotes: WritableSignal<Array<INote | IAuthor>> = signal(
    []
  );

  public openFullScreen = false;
  public pinned = false;
  public selectedNote: INote | IAuthor | undefined;
  public pageData: any;

  public createNote(data: ICreateNote) {
    const id = this.global.generateId();
    const date = this.global.date;
    const note = {
      title: data.title,
      id: id,
      date: date,
      tags: data.tags,
      content: '',
    } satisfies INote;

    this.notes.update((notes: Array<INote | IAuthor>) => [note, ...notes]);
    if (Boolean(this.pinnedNotes().length)) {
      this.notes.update(
        this.stackPinnedNotes_getNewArrangementOfNotes.bind(this)
      );
    }

    this.router.navigateByUrl(`/notes/note/preview/${id}/edit`);
  }

  public editNoteTitle(data: { id: string; title: string }) {
    this.notes.update((notes: Array<INote | IAuthor>) =>
      notes.reduce((result: Array<INote | IAuthor>, note: INote | IAuthor) => {
        if (note.id === data.id) {
          let edited = {
            ...note,
          } satisfies INote | IAuthor;
          edited.title = data.title;

          return result.concat(edited);
        }
        return result.concat(note);
      }, [])
    );
  }

  public pinNote(pinnedNote: INote | IAuthor) {
    this.pinnedNotes.update((notes: Array<INote | IAuthor>) => {
      const filtered = notes.filter(
        (note: INote | IAuthor) => note.id !== pinnedNote.id
      );
      return [pinnedNote, ...filtered];
    });

    this.notes.update(
      this.stackPinnedNotes_getNewArrangementOfNotes.bind(this)
    );
  }

  public unpinNote(noteId: string) {
    this.pinnedNotes.update((notes: Array<INote | IAuthor>) => {
      return notes.filter((note: INote | IAuthor) => note.id !== noteId);
    });

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
  public stackPinnedNotes_getNewArrangementOfNotes(
    notes: Array<INote | IAuthor>
  ): Array<INote | IAuthor> {
    const mapIndex: Record<string, number> = {};

    // Mapping the index of pinned note in notes
    notes.forEach((note: INote | IAuthor, index: number) => {
      this.pinnedNotes().forEach((pinnedNote: INote | IAuthor) => {
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
  public unstackUnpinnedNote_getNewArrangementOfNotes(
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

  public getNote(noteId: string): INote | IAuthor {
    const note = this.notes().find((note: INote | IAuthor) => {
      return noteId === note.id;
    }) satisfies INote | IAuthor | undefined;

    if (!note) {
      throw Error('Cannot find note with the provided id');
    }
    return note;
  }

  private saveNotes() {
    this.storage.saveItem('notes', this.notes());
  }

  public saveEditedNote(editedNote: INote) {
    const unEditedNotes = this.notes().filter((note: INote | IAuthor) => {
      return note.id !== editedNote.id;
    }) satisfies Array<INote | IAuthor>;

    this.notes.update(() => [editedNote, ...unEditedNotes]);

    if (Boolean(this.pinnedNotes().length)) {
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

  /**
   * Saves the pinnedNotes array to storage.
   */
  private savePinnedNotes() {
    localStorage.setItem('pinnedNotes', JSON.stringify(this.pinnedNotes()));
  }

  public getPinnedNotes() {
    const jsonStr = localStorage.getItem('pinnedNotes') satisfies string | null;
    if (jsonStr) this.pinnedNotes.set(JSON.parse(jsonStr));

    return this;
  }

  // Updates the 'pinned' property value in the note service
  // by comparing each note of the 'notes' array with the entries in the 'pinnedNote' array.
  // If a note's id matches any of the pinned notes id, the 'pinned'
  // value is set to true for that note; otherwise, it's set to false.
  notePinned(note: INote | IAuthor): boolean {
    let mapIndex: Record<string, number> = {};

    if (Boolean(this.pinnedNotes().length)) {
      this.pinnedNotes().forEach(
        (pinnedNote: INote | IAuthor, index: number) => {
          mapIndex[pinnedNote.id] = index;
        }
      );

      const index = mapIndex[note.id] satisfies number | undefined;
      if (index !== undefined) this.pinned = true;
      else this.pinned = false;
    } else {
      this.pinned = false;
    }
    return this.pinned;
  }

  togglePin(note: INote | IAuthor) {
    if (Boolean(this.pinnedNotes().length)) {
      const noteExistInPinnedNotes = this.pinnedNotes().find(
        (pinnedNote: INote | IAuthor) => pinnedNote.id === note.id
      ) satisfies INote | IAuthor | undefined;

      if (Boolean(noteExistInPinnedNotes)) {
        const exitingNote = noteExistInPinnedNotes as INote | IAuthor;
        this.unpinNote(exitingNote.id);
      } else {
        this.pinNote(note);
      }
    } else {
      this.pinNote(note);
    }
  }

  getAudio(text: string): Observable<{ elevenlabs: IEdenAPIAudio } | any> {
    const data: IEdentAPIData = {
      providers: 'elevenlabs',
      language: 'eng',
      text: text,
      option: 'FEMALE',
    };

    return this.http
      .post(this.url, data, {
        headers: this.header,
      })
      .pipe(
        catchError((err) => {
          return err;
        })
      ) as Observable<{ elevenlabs: IEdenAPIAudio } | any>;
  }
}
