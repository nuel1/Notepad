import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iNote } from 'src/app/interface/model';
import { toHTML, toDoc } from 'ngx-editor';
import { iNgxEditorJson } from 'src/app/interface/model';
import { Router } from '@angular/router';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() tags: string[] = [];
  @Input() noteIndex = 0;
  @Input() note?: iNote;
  @Output() onToggleNoteOption = new EventEmitter();
  @Output() deleteNote = new EventEmitter();
  @Output() onFocusNote = new EventEmitter();

  constructor(private router: Router) {}

  noteIsFocused = false;
  noteOptionToggled = false;

  ngOnInit(): void {
    if (this.note) {
      this.note['noteIsFocused'] = this.noteIsFocused;
      this.note['noteOptionToggled'] = this.noteOptionToggled;
    }
  }

  convertHtmlToText(html: string) {
    const jsonDoc: iNgxEditorJson = toDoc(html) as iNgxEditorJson;
    return jsonDoc.content[0].content[0].text;
  }

  toggleNoteOption(note: iNote) {
    note.noteOptionToggled = true;
    this.onToggleNoteOption.emit(note);
  }

  onDelete(note: iNote) {
    this.deleteNote.emit(note);
  }

  openNote(note: iNote) {
    this.onFocusNote.emit(note);
    this.router.navigate(['notes', note.id, 'preview']);
  }
}
