import { Injectable, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public mobile_sideNavbar: HTMLElement | undefined;
  public tagInput: Element | undefined;
  public $showTagInput = new BehaviorSubject<boolean>(false);
  public renderer2: Renderer2 | undefined;

  public documentIsScrollable = true;

  constructor() {}

  public openSideNavbar() {
    if (this.mobile_sideNavbar as HTMLElement)
      this.renderer2?.addClass(
        this.mobile_sideNavbar,
        'side-navbar--mobile-active'
      );
  }

  public closeSideNavbar() {
    if (this.mobile_sideNavbar as HTMLElement)
      this.renderer2?.removeClass(
        this.mobile_sideNavbar,
        'side-navbar--mobile-active'
      );
  }
}
