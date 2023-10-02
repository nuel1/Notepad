import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent {
  constructor() {}

  @Output() submit = new EventEmitter();
  @Output() close = new EventEmitter();

  title = '';
  tags: string[] = [];
}
