import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterContentInit,
  Signal,
  computed,
  Inject,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalsService } from 'src/app/core/globals.service';
import { IAuthor, INote } from 'src/app/interface/note';
import { NoteService } from './services/note.service';
import { DefaultNote } from 'src/app/note.default';
import { BehaviorSubject, Subscription, from, fromEvent } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NoteFormComponent } from './components/note-form/note-form.component';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [NoteService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild('title', { static: true }) heading: ElementRef | undefined;
  @ViewChild('form') formTemplate: TemplateRef<NoteFormComponent> | undefined;
  constructor(
    private router: Router,
    public noteService: NoteService,
    public globalService: GlobalsService,
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private viewContainerRef: ViewContainerRef
  ) {
    this.notes();
  }

  formOpen = false;
  subscription: Subscription | undefined;
  currentRoutePathIsNotes: boolean | undefined;
  notes: Signal<Array<INote | IAuthor>> = computed(() =>
    this.noteService.notes()
  );
  isMobile = new BehaviorSubject<boolean>(false);

  async ngOnInit() {
    this.title.setTitle('My Notes');

    this.subscription = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .subscribe((result) => {
        this.isMobile.next(result.matches);
        this.currentRoutePathIsNotes = !!this.router.url.match(/notes$/);
        this.subscription = this.router.events.subscribe((e) => {
          if (e instanceof NavigationEnd)
            this.currentRoutePathIsNotes = !!this.router.url.match(/notes$/);
        });
      });

    const authorNote = new DefaultNote() satisfies IAuthor;

    /* 
    Author's note can only be saved once.
    */
    if (!localStorage.getItem('authorNoteSaved')) {
      this.noteService.notes.set([
        ...this.noteService.notes(),
        authorNote,
      ]) satisfies void;

      this.noteService.saveNotes();
      localStorage.setItem('authorNoteSaved', JSON.stringify(true));
    }

    this.noteService.getNotes();
    console.log(this.noteService.notes());
  }

  ngAfterContentInit(): void {}

  async getNotes() {}

  createNote(formEntries: { title: string; tags: string[] }) {
    try {
      const id = this.noteService.createNote(formEntries) as string;
      this.router.navigateByUrl(`/notes/note/preview/${id}/edit`);
    } catch (e) {
      console.error(e);
    }
  }

  // Updates the 'pinned' property value in the note service
  // by comparing each note of the 'notes' array with the entries in the 'pinnedNote' array.
  // If a note's content matches any of the pinned notes, the 'pinned'
  // value is set to true for that note; otherwise, it's set to false.
  notePinned(note: INote | IAuthor): boolean {
    let mapIndex: Record<string, number> = {};

    if (Boolean(this.noteService.pinnedNotes.length)) {
      this.noteService.pinnedNotes.forEach(
        (pinnedNote: INote | IAuthor, index: number) => {
          mapIndex[pinnedNote.id] = index;
        }
      );

      const index = mapIndex[note.id] satisfies number | undefined;
      if (index !== undefined) this.noteService.pinned = true;
      else this.noteService.pinned = false;
    } else {
      this.noteService.pinned = false;
    }
    return this.noteService.pinned;
  }

  togglePin(note: INote | IAuthor) {
    if (Boolean(this.noteService.pinnedNotes.length)) {
      const noteExistInPinnedNotes = this.noteService.pinnedNotes.find(
        (pinnedNote: INote | IAuthor) => pinnedNote.id === note.id
      ) satisfies INote | IAuthor | undefined;

      if (Boolean(noteExistInPinnedNotes)) {
        const exitingNote = noteExistInPinnedNotes as INote | IAuthor;
        this.noteService.unpinNote(exitingNote.id);
      } else {
        this.noteService.pinNote(note);
      }
    } else {
      this.noteService.pinNote(note);
    }
  }

  cancel(formCanceled: boolean) {}

  deleteNote(id: string) {
    this.changeRoute(id, () => {
      this.noteService.deleteNote(id);
    });
  }

  async changeRoute(id: string, deleteFn: Function) {
    const [prevIndex, nextIndex] = this.noteService
      .notes()
      .reduce(
        (result: number[], note: INote, index: number) =>
          note.id === id ? result.concat(index - 1, index + 1) : result,
        []
      );

    let note;
    if (this.noteService.notes()[nextIndex])
      note = this.noteService.notes()[nextIndex];

    if (!note && this.noteService.notes()[prevIndex])
      note = this.noteService.notes()[prevIndex];

    await deleteFn();
    if (!this.isMobile) {
      if (note) this.router.navigateByUrl(`/notes/note/preview/${note.id}`);
      else this.router.navigateByUrl('/notes');
    }
  }

  trackById(index: number, note: INote | IAuthor) {
    return note.id;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
