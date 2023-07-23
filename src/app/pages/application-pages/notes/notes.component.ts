import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/core/globals/globals.service';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { INote } from 'src/app/interface/model';
import { NoteService } from './service/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  providers: [NoteService],
})
export class NotesComponent implements OnInit {
  constructor(private router: Router, private noteService: NoteService) {}

  openForm = false;
  notes: INote[] = [];

  async ngOnInit() {
    this.notes = await this.noteService.getNotes();
  }

  async getNotes() {}

  createNote(noteCreated: boolean) {
    if (noteCreated) this.openForm = false;
  }

  openNoteForm() {
    this.openForm = true;
  }

  cancel(formCanceled: boolean) {
    if (formCanceled) this.openForm = false;
  }

  async deleteNote(note: INote) {
    const noteId = note.id;
    await this.noteService.deleteNote(noteId);
  }
}
