import {
  Component,
  Renderer2,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private renderer2: Renderer2, private router: Router) {
    this.subscription = router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) this.closeSideNavbar();
    });
  }
  sideNavbar: Element | undefined;
  subscription: Subscription | undefined;
  async ngOnInit() {}

  ngAfterViewInit(): void {
    this.sideNavbar = document.querySelector('.side-navbar--mobile') as Element;
  }

  openSideNavbar() {
    this.renderer2.addClass(this.sideNavbar, 'isactive');
  }

  closeSideNavbar() {
    this.renderer2.removeClass(this.sideNavbar, 'isactive');
  }

  ngOnDestroy(): void {
    console.log('destroyed');
    this.subscription?.unsubscribe();
  }
}
