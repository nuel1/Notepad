import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { EventService } from 'src/app/core/event.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[sideMenuToggleEvent]',
})
export class SideMenuToggleEvent {
  @Input() menuOpen = false;
  @Output() openMenu = new EventEmitter();
  @Output() closeMenu = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private eventService: EventService,
    private renderer2: Renderer2
  ) {}

  subscriber: Subscription | undefined;

  @HostListener('click', ['$event']) onclick($event: Event) {
    this.eventService.$showTagInput.next(false);

    if (this.menuOpen) {
      this.closeMenu.emit();
    }

    if (!this.menuOpen) {
      this.openMenu.emit();
    }

    $event.stopPropagation();
  }
}
