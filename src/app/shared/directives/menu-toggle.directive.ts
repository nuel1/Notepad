import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[menuToggle]',
})
export class MenuToggleDirective {
  @Input() menuOpen = false;
  @Output() openSideNavbar: EventEmitter<null> = new EventEmitter();
  @Output() closeSideNavbar: EventEmitter<null> = new EventEmitter();

  constructor() {}

  @HostListener('click', ['$event']) onclick($event: Event) {
    if (this.menuOpen) this.openSideNavbar.emit();
    else this.closeSideNavbar.emit();
    $event.stopPropagation();
  }
}
