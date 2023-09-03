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

  constructor() {}

  ngOnInit(): void {}
}
