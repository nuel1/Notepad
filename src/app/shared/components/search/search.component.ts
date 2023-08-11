import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/core/globals.service';
@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  // For responsiveness
  @Input() mobileCssClasses = '';

  constructor(private globals: GlobalsService, private router: Router) {
    globals.activeRoute().subscribe((path) => {
      if (path[path.length - 1] === 'home') {
        this.placeholder = '📔📕📗📘📙📓📒';
        this.isDisabled = true;
        this.notHome = false;
      } else {
        if (path.includes('editor')) {
          this.placeholder = `Search ${path[0]}...`;
        } else {
          this.placeholder = `Search ${path[0]}...`;
        }
        this.isDisabled = false;
        this.notHome = true;
      }
    });
  }

  placeholder = '';
  notHome = true;
  isDisabled = true;

  ngOnInit(): void {}
}
