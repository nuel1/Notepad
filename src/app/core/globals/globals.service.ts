import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class GlobalsService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  currentRoute = '';
  keyLength = 16; // Length of the key in bytes (e.g., 16 bytes for a 128-bit key)

  keyBytes = new Uint8Array(this.keyLength);

  secreteKey = Array.from(this.keyBytes)
    .map((byte) => String.fromCharCode(byte))
    .join('');

  activeRoute() {
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

  encrypt(id: string) {
    return crypto.AES.encrypt(id, this.secreteKey).toString();
  }

  decrypt(id: string) {
    const decrypted = crypto.AES.decrypt(id, this.secreteKey).toString(
      crypto.enc.Utf8
    );

    return decrypted;
  }

  get generateKey() {
    return crypto.lib.WordArray.random(16).toString();
  }

  get date() {
    return new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
