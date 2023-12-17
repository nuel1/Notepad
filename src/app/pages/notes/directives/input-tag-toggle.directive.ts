import {
  Directive,
  HostListener,
  ElementRef,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { EventService } from 'src/app/core/event.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[inputTagToggle]',
})
export class InputTagToggleDirective implements OnDestroy {
  constructor(
    private elementRef: ElementRef,
    private eventService: EventService
  ) {}

  subscriber: Subscription | undefined;

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onClick($event: Event) {
    this.eventService.$showTagInput.next(true);
    $event.stopPropagation();
  }
}
