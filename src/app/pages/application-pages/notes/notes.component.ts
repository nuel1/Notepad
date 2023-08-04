import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/core/services/globals.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { INote } from 'src/app/interface/note';
import { NoteService } from 'src/app/core/services/note.service';
import { DefaultNote } from 'src/app/note.default';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [NoteService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  constructor(
    private router: Router,
    public noteService: NoteService,
    private globalService: GlobalsService,
    private title: Title
  ) {}

  formOpen = false;
  async ngOnInit() {
    this.title.setTitle('My Notes');

    const authorNote = new DefaultNote();

    /* 
    Author's note can only be saved once.
    */
    if (!localStorage.getItem('authorNoteSaved')) {
      this.noteService.notes = [...this.noteService.notes, authorNote];
      this.noteService.saveNotes();
      localStorage.setItem('authorNoteSaved', JSON.stringify(true));
    }

    this.noteService.getNotes();
  }

  async getNotes() {}

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
    note
      ? this.router.navigateByUrl(`/notes/note/preview/${note.id}`)
      : this.router.navigateByUrl('/notes');
  }

  trackById(index: number, note: INote) {
    return note.id;
  }
}
