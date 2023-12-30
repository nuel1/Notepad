import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'network-status-toast',
  templateUrl: './network-status-toast.component.html',
  styleUrls: ['./network-status-toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkStatusToastComponent {
  @Input() isOnline = true;

  refresh() {
    location.reload();
  }
}
