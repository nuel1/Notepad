import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/core/services/globals.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { INote } from 'src/app/interface/note';
import { NoteService } from 'src/app/core/services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [NoteService],
})
export class NotesComponent implements OnInit {
  constructor(
    private router: Router,
    public noteService: NoteService,
    private globalService: GlobalsService
  ) {}

  formOpen = false;
  async ngOnInit() {
    this.noteService.getNotes();
  }

  async getNotes() {}

  cancel(formCanceled: boolean) {}

  async deleteNote(id: string) {
    this.changeRoute(id, async () => {
      await this.noteService.deleteNote(id);
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
}
