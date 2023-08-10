import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoteService } from 'src/app/core/services/note.service';
import { SideNavbarComponent } from 'src/app/shared/components/side-navbar/side-navbar.component';

@Component({
  selector: 'app-application-pages',
  templateUrl: './application-pages.component.html',
  styleUrls: ['./application-pages.component.scss'],
})
export class ApplicationPagesComponent
  implements OnInit, AfterViewInit, OnDestroy
{
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
    this.subscription?.unsubscribe();
  }
}
