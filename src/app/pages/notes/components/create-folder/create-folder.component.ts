import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss'],
})
export class CreateFolderComponent {
  @Output() cancel = new EventEmitter<boolean>();
  title = '';

  onInputChange(text: string) {
    this.title = text;
  }

  onCancel(bool: boolean) {
    this.cancel.emit(bool);
  }
}
