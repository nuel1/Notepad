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
    private eventService: EventService,
    private renderer2: Renderer2
  ) {
    // this.subscriber = eventService.showTagInput$.subscribe((show) => {
    //   if (!show) eventService.showInputField = true;
    // });
  }

  subscriber: Subscription | undefined;

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onClick($event: Event) {
    const el = document.getElementById('tag-input');
    if (el) {
      this.eventService.tagInput = el;
      this.eventService.openInputTag(this.renderer2);
    }
    $event.stopPropagation();
  }
}
