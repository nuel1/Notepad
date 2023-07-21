import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/core/globals/globals.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { DefaultNote } from 'src/app/note.default';
@Component({
  selector: 'app-application-pages',
  templateUrl: './application-pages.component.html',
  styleUrls: ['./application-pages.component.scss'],
})
export class ApplicationPagesComponent implements OnInit {
  constructor(
    private globals: GlobalsService,
    private storage: StorageService
  ) {}
  ngOnInit(): void {
    const authorNote = new DefaultNote();

    /* Default note can only be saved once, therefore, if
    it is saved a flag called defaultNoteSaved marks it saved.
    In case this note is deleted, the flag still has the record
    that default note was onced saved, but now deleted. Therefore,
    default note cannot be saved again. */
    if (localStorage.getItem('defaultNoteSaved')) return;
    this.storage.saveItem('notes', authorNote);
    localStorage.setItem('defaultNoteSaved', JSON.stringify(true));
  }
}
