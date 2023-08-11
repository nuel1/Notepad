import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  constructor(
    private global: GlobalsService,
    private storage: StorageService
  ) {}

  // getUserPersonalInfo() {

  // }
}
