import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventClickOutsideDirective } from './event-click-outside.directive';
import { MenuToggleDirective } from './menu-toggle.directive';

@NgModule({
  declarations: [EventClickOutsideDirective, MenuToggleDirective],
  imports: [CommonModule],
  exports: [EventClickOutsideDirective, MenuToggleDirective],
})
export class DirectiveModule {}
