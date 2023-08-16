import {
  Component,
  Renderer2,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from './core/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(public eventService: EventService, private router: Router) {
    this.subscription = router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) eventService.closeSideNavbar();
    });
  }
  subscription: Subscription | undefined;
  async ngOnInit() {}

  ngAfterViewInit(): void {
    this.eventService.mobile_sideNavbar = document.querySelector(
      '.side-navbar--mobile'
    ) as HTMLElement;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
