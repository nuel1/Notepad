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
    await this.noteService.getNotes();
  }

  async getNotes() {}

  cancel(formCanceled: boolean) {}

  async deleteNote(note: INote) {
    // await this.noteService.deleteNote(noteId);
  }
}
