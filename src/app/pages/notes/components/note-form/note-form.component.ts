import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteFormComponent {
  constructor() {}

  @Output() createNote = new EventEmitter();
  @Output() cancel = new EventEmitter();

  title = new FormControl('', Validators.required);
  tags: string[] = [];
  tag = '';

  async onCreateNote() {
    this.createNote.emit({
      title: this.title.value,
      tags: this.tags,
    });
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