import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'edit-title',
  templateUrl: './edit-title.component.html',
  styleUrls: ['./edit-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTitleComponent {
  @Output() submit = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input({ required: true }) noteId: string | undefined;
  @Input({ required: true }) initialTitle: string | undefined;
  @Input() formState: 'edit' | 'create' = 'create';

  title = '';

  onSubmit(newTitle: string) {
    this.submit.emit({ id: this.noteId, title: newTitle });
  }
}
