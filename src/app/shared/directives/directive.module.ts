import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventClickOutsideDirective } from './event-click-outside.directive';

@NgModule({
  declarations: [EventClickOutsideDirective],
  imports: [CommonModule],
  exports: [EventClickOutsideDirective],
})
export class DirectiveModule {}
