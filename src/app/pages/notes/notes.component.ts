import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalsService } from 'src/app/core/globals.service';
import { IAuthor, INote } from 'src/app/interface/note';
import { NoteService } from './services/note.service';
import { DefaultNote } from 'src/app/note.default';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [NoteService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    public noteService: NoteService,
    public globalService: GlobalsService,
    private title: Title,
    private breakpointObserver: BreakpointObserver
  ) {}

  formOpen = false;
  subscription: Subscription | undefined;
  currentRoutePathIsNotes: boolean | undefined;
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
      this.noteService.notes = [
        ...this.noteService.notes,
        authorNote,
      ] satisfies Array<INote | IAuthor>;
      this.noteService.saveNotes();
      localStorage.setItem('authorNoteSaved', JSON.stringify(true));
    }

    this.noteService.getNotes();
  }

  async getNotes() {}

  createNote(formEntries: { title: string; tags: string[] }) {
    const id = this.noteService.createNote(formEntries) satisfies string;
    this.router.navigateByUrl(`/notes/note/preview/${id}/edit`);
  }

  cancel(formCanceled: boolean) {}

  deleteNote(id: string) {
    this.changeRoute(id, () => {
      this.noteService.deleteNote(id);
    });
  }

  async changeRoute(id: string, deleteFn: Function) {
    const [prevIndex, nextIndex] = this.noteService.notes.reduce(
      (result: number[], note: INote, index: number) =>
        note.id === id ? result.concat(index - 1, index + 1) : result,
      []
    );

    let note;
    if (this.noteService.notes[nextIndex])
      note = this.noteService.notes[nextIndex];

    if (!note && this.noteService.notes[prevIndex])
      note = this.noteService.notes[prevIndex];

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
