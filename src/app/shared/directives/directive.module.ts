import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuToggleEvent } from './sidemenu-toggle-event.directive';

@NgModule({
  declarations: [SideMenuToggleEvent],
  imports: [CommonModule],
  exports: [SideMenuToggleEvent],
})
export class DirectiveModule {}
