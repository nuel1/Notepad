import {
  Component,
  ElementRef,
  EventEmitter,
  ViewChild,
  Input,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { iNote } from 'src/app/interface/model';

@Component({
  selector: 'note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
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
