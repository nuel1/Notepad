import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'note-form-input-error',
  templateUrl: './note-form-input-error.component.html',
  styleUrls: ['./note-form-input-error.component.scss'],
})
export class NoteFormInputErrorComponent {
  @Input() input: FormControl | undefined;
}
