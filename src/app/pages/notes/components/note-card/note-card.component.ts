import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IAuthor, INote } from 'src/app/interface/note';
import { toHTML, toDoc } from 'ngx-editor';
import { INgxEditorJson } from 'src/app/interface/ngx-editor';

@Component({
  selector: 'note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteCardComponent implements OnInit {
  @Input() note: INote | IAuthor | any;
  @Input() pinned: boolean | undefined;
  @Output() deleteNote = new EventEmitter<string>();
  @Output() onTogglePin = new EventEmitter<INote | IAuthor>();
  @Output() openOptions = new EventEmitter<boolean>();

  btnDisabled = true;
  tagReminder = 0;
  constructor() {}

  ngOnInit(): void {}
  convertHtmlToText(html: string) {
    try {
      if (!this.note?.content) return '';
      const parse = new DOMParser();
      const htmlDoc = parse.parseFromString(html, 'text/html');
      const anchorTags = htmlDoc.querySelectorAll('a');
      // anchorTags.forEach((a: HTMLElement) => {
      //   a.parentNode?.replaceChild(
      //     htmlDoc.createTextNode(a.textContent as string),
      //     a
      //   );
      // });

      const textDoc = new XMLSerializer().serializeToString(htmlDoc);
      const jsonDoc: INgxEditorJson = toDoc(textDoc) as INgxEditorJson;
      return jsonDoc.content[0].content[0].text;
    } catch (e) {
      return '';
    }
  }

  onDelete(note: INote | IAuthor) {
    this.deleteNote.emit(note.id);
  }

  getNumberOfTags(qty: number) {
    if (this.note) {
      if (qty === this.note.tags.length || qty > this.note.tags.length)
        return this.note.tags;
      this.tagReminder = this.note.tags.length - qty;
      return this.note.tags.slice(0, qty);
    }
    return [];
  }
}
