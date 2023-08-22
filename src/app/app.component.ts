import {
  Component,
  Renderer2,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from './core/event.service';
import { SideNavbarComponent } from './shared/components/side-navbar/side-navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sideNavbar') sideNavbar: SideNavbarComponent | undefined;
  constructor(
    public eventService: EventService,
    private router: Router,
    private renderer2: Renderer2
  ) {
    eventService.renderer2 = renderer2;
    this.subscription = router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) eventService.closeSideNavbar();
    });
  }
  subscription: Subscription | undefined;
  async ngOnInit() {}

  ngAfterViewInit(): void {
    this.eventService.mobile_sideNavbar =
      this.sideNavbar?.sideNavbar?.nativeElement;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
