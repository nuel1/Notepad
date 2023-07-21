import { Injectable } from '@angular/core';
import { GlobalsService } from '../globals/globals.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private global: GlobalsService,
    private storage: StorageService
  ) {}

  async createNote(tags: string[], title: string) {
    try {
      const id = this.storage.getNewId('notes');
      const encryptedId = this.global.encrypt(String(id));
      const dateCreate = this.global.date;
      const note = {
        title,
        id: encryptedId,
        dateCreate,
        tags,
      };

      await this.storage.saveItem('notes', note);
      return encryptedId;
    } catch (e) {
      throw e;
    }
  }

  // getUserPersonalInfo() {

  // }
}
