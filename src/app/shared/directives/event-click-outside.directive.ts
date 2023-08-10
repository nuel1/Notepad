import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Input,
} from '@angular/core';

@Directive({
  selector: '[EventClickOutsideDirective]',
})
export class EventClickOutsideDirective {
  @Output() customBlur = new EventEmitter();
  @Input() isTarget = false;
  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) this.customBlur.emit();
  }
}
