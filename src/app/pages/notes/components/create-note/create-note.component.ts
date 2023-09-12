import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent {
  constructor() {}

  @Output() createNote = new EventEmitter();
  @Output() cancel = new EventEmitter();

  title = new FormControl('', Validators.required);
  tags: string[] = [];
  tag = '';

  async onCreateNote(formEntries: { title: string; tags: Array<string> }) {
    this.createNote.emit(formEntries);
  }

  onCancel() {
    this.cancel.emit(false);
  }

  newTags(tags: string[]) {
    this.tags = tags;
  }

  onInputChange(text: string) {
    this.title.setValue(text);
  }
}
