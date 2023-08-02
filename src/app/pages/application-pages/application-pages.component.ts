import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { DefaultNote } from 'src/app/note.default';
@Component({
  selector: 'app-application-pages',
  templateUrl: './application-pages.component.html',
  styleUrls: ['./application-pages.component.scss'],
})
export class ApplicationPagesComponent implements OnInit {
  constructor(private noteService: NoteService) {}
  async ngOnInit() {
    const authorNote = new DefaultNote();

    /* 
    Author's note can only be saved once.
    */
    if (localStorage.getItem('authorNoteSaved')) return;
    this.noteService.notes = [...this.noteService.notes, authorNote];
    await this.noteService.saveNote();
    localStorage.setItem('authorNoteSaved', JSON.stringify(true));
  }
}
