import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements AfterViewInit {
  @ViewChild('sideNavbar') sideNavbar: ElementRef | undefined;
  @Input()
  navbarTabCssClasses = '';
  @Input() profileCssClasses = '';
  @Input() navbarFooterCssClasses = '';
  @Input() sideNavbarCssClasses = '';
  @Input() searchCssClasses = '';
  @Input() sideNavbarStyles = '';

  container: Element | undefined;

  constructor(private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    this.container = document.querySelector('.side-navbar--mobile') as Element;
  }

  openSideNavbar() {
    this.renderer2.addClass(this.container, 'isactive');
  }

  closeNavbar() {
    this.renderer2.removeClass(this.container, 'isactive');
  }
}
