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
  ) {
    // this.subscriber = eventService.showTagInput$.subscribe((show) => {
    //   eventService.showInputField = false;
    // });
  }

  subscriber: Subscription | undefined;

  @HostListener('click', ['$event']) onclick($event: Event) {
    const tagInput = document.getElementById('tag-input');

    if (tagInput) {
      this.eventService.tagInput = tagInput;
      this.eventService.closeInputTag(this.renderer2);
    }

    if (
      this.eventService.mobile_sideNavbar &&
      !this.eventService.mobile_sideNavbar.classList.contains(
        'side-navbar--mobile-active'
      ) &&
      this.menuOpen
    ) {
      this.openMenu.emit();
    }

    if (
      this.eventService.mobile_sideNavbar &&
      this.eventService.mobile_sideNavbar.classList.contains(
        'side-navbar--mobile-active'
      ) &&
      !this.menuOpen
    ) {
      this.closeMenu.emit();
    }

    $event.stopPropagation();
  }
}
