import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INote } from 'src/app/interface/note';
import { toHTML, toDoc } from 'ngx-editor';
import { INgxEditorJson } from 'src/app/interface/ngx-editor';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() tags: string[] = [];
  @Input() noteIndex = 0;
  @Input() note: INote | undefined;
  @Output() deleteNote = new EventEmitter();

  btnDisabled = true;
  constructor() {}

  ngOnInit(): void {}

  convertHtmlToText(html: string) {
    const jsonDoc: INgxEditorJson = toDoc(html) as INgxEditorJson;
    return jsonDoc.content[0].content[0].text;
  }

  onDelete(note: INote) {
    this.deleteNote.emit(note);
  }
}
