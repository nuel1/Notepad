import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteComponent {
  constructor() {}

  @Output() submit = new EventEmitter();
  @Output() close = new EventEmitter();

  title = '';
  tags: string[] = [];
}
