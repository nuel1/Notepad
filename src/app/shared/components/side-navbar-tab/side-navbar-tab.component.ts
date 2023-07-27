import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'side-navbar-tab',
  templateUrl: './side-navbar-tab.component.html',
  styleUrls: ['./side-navbar-tab.component.scss'],
})
export class SideNavbarTabComponent {
  @Input() tabName = '';
}
