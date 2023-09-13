import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  Input,
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

  @Input() buttonText = '';
  @Input() headingText = '';
  @Input() set inputChanges(value: string) {
    this.title.setValue(value);
  }
  @Input() set addTag(tags: Array<string>) {
    this.tags = tags;
  }
  @Output() create = new EventEmitter();
  @Output() cancel = new EventEmitter();

  title = new FormControl('', Validators.required);
  tags: string[] = [];

  async onCreate() {
    this.create.emit({
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
}
