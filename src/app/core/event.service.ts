import { Injectable, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public mobile_sideNavbar: HTMLElement | undefined;
  public tagInput: Element | undefined;
  public showTagInput = false;

  constructor() {}

  public openSideNavbar() {
    if (this.mobile_sideNavbar as HTMLElement)
      this.mobile_sideNavbar?.classList.add('side-navbar--mobile-active');
  }

  public closeSideNavbar() {
    if (this.mobile_sideNavbar as HTMLElement)
      this.mobile_sideNavbar?.classList.remove('side-navbar--mobile-active');
  }

  public openInputTag(renderer2: Renderer2) {
    renderer2.setAttribute(this.tagInput, 'is-open', 'true');
    renderer2.setStyle(this.tagInput, 'display', 'block');
  }

  public closeInputTag(renderer2: Renderer2) {
    renderer2.removeAttribute(this.tagInput, 'is-open');
    renderer2.setStyle(this.tagInput, 'display', 'none');
  }
}
