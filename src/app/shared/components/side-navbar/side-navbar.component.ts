import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent {
  @Input() navbarTabCssClasses = '';
  @Input() profileCssClasses = '';
  @Input() navbarFooterCssClasses = '';
  @Input() sideNavbarCssClasses = '';
  @Input() searchCssClasses = '';
}
