import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuToggleDirective } from './menu-toggle.directive';

@NgModule({
  declarations: [MenuToggleDirective],
  imports: [CommonModule],
  exports: [MenuToggleDirective],
})
export class DirectiveModule {}
