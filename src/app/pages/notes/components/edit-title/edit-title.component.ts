import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'edit-title',
  templateUrl: './edit-title.component.html',
  styleUrls: ['./edit-title.component.scss'],
})
export class EditTitleComponent {
  @Output() submit = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() formState: 'edit' | 'create' = 'create';
  @Input() set initialTitle(value: string) {
    this.title = value;
  }

  title = '';
}
