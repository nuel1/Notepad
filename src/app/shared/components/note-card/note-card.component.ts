import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { INote } from 'src/app/interface/note';
import { toHTML, toDoc } from 'ngx-editor';
import { INgxEditorJson } from 'src/app/interface/ngx-editor';
import { GlobalsService } from 'src/app/core/services/globals.service';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteCardComponent implements OnInit {
  @Input() note: INote | undefined;
  @Output() deleteNote = new EventEmitter();

  btnDisabled = true;
  tagReminder = 0;
  constructor(private globalService: GlobalsService) {}

  ngOnInit(): void {}
  convertHtmlToText(html: string) {
    try {
      if (!this.note?.content) return '';
      const jsonDoc: INgxEditorJson = toDoc(html) as INgxEditorJson;
      return jsonDoc.content[0].content[0].text;
    } catch (e) {
      return '';
    }
  }

  onDelete(note: INote) {
    this.deleteNote.emit(note.id);
  }

  getAmtOfTags(amt: number) {
    if (this.note && this.note.tags.length) {
      if (amt === this.note.tags.length || amt > this.note.tags.length)
        return this.note.tags;
      this.tagReminder = this.note.tags.length - amt;
      return this.note.tags.slice(0, amt);
    }
    return [];
  }
}
