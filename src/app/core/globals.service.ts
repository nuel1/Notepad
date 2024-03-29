import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  ActivationStart,
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import * as Crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  constructor(private router: Router, private route: ActivatedRoute) {
    this.setPageData();
  }

  pageData: any;

  public currentRoute = '';
  private keyLength = 16; // Length of the key in bytes (e.g., 16 bytes for a 128-bit key)

  private keyBytes = new Uint8Array(this.keyLength);

  private secreteKey = Array.from(this.keyBytes)
    .map((byte) => String.fromCharCode(byte))
    .join('');

  public activeRoute() {
    return this.router.events.pipe(
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
      map((url) => url.map((segment) => segment.path))
    );
  }

  public encrypt(id: string) {
    return Crypto.AES.encrypt(id, this.secreteKey).toString();
  }

  public decrypt(id: string) {
    const decrypted = Crypto.AES.decrypt(id, this.secreteKey).toString(
      Crypto.enc.Utf8
    );

    return decrypted;
  }

  private get generateKey() {
    return Crypto.lib.WordArray.random(16).toString();
  }

  public get date() {
    return new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  public generateId() {
    return (String([1e7]) + -1e3 + -4e3 + -8e3 + -1e11)
      .replace(/[018]/g, (c: any) => {
        return (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16);
      })
      .replace(/-/g, '');
  }

  setPageData() {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationStart) {
        this.pageData = event.snapshot.data;
      }
    });
  }
}
