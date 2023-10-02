import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'create-folder',
  templateUrl: './create-folder.component.html',
  styleUrls: ['./create-folder.component.scss'],
})
export class CreateFolderComponent {
  @Output() close = new EventEmitter();
  title = '';
}
