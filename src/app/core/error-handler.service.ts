import { DOCUMENT } from '@angular/common';
import { ErrorHandler, Inject, Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  isOnline = true;
  constructor(@Inject(DOCUMENT) private document: Document) {
    window.addEventListener(
      'offline',
      () => ((this.isOnline = false), console.log('Offline'))
    );
    window.addEventListener(
      'online',
      () => ((this.isOnline = true), console.log('Online'))
    );
  }

  handleError(error: any): void {}
}
