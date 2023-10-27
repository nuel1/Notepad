import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent {
  @Input() btnDeleteText = '';
  @Input() warningText = '';
  @Output() onClose = new EventEmitter();
  @Output() onDelete = new EventEmitter();
}
