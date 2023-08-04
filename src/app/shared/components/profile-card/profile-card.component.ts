import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  // For responsiveness
  @Input() mobileCssClasses = '';
}
