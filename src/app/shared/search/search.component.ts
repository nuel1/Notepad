import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  placeholder = '';
  notHomePage = true;
  isDisabled = true;

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.url),
        map((url) => url.map((segment) => segment.path).join('/'))
      )
      .subscribe((path: string) => {
        path == 'home'
          ? ((this.notHomePage = false),
            (this.placeholder = '📔📕📗📘📙📓📒'),
            (this.isDisabled = true))
          : ((this.notHomePage = true),
            (this.placeholder = `Search ${path}...`),
            (this.isDisabled = false));
      });
  }
}
