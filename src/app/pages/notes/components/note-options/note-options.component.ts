import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'note-options',
  templateUrl: './note-options.component.html',
  styleUrls: ['./note-options.component.scss'],
})
export class NoteOptionsComponent {
  @Output() onClose = new EventEmitter();
  @Output() onDelete = new EventEmitter<boolean>();
  @Output() onShare = new EventEmitter();
  @Output() onChart = new EventEmitter();
  @Output() onCopy = new EventEmitter();
  @Output() onClone = new EventEmitter();
  @Output() onExport = new EventEmitter();
  @Output() onEditTitle = new EventEmitter<boolean>();
}
