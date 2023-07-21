import { Injectable } from '@angular/core';
import { GlobalsService } from '../globals/globals.service';
import { iNote } from 'src/app/interface/model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private globals: GlobalsService) {}

  saveItem(path: string, data: any) {
    return new Promise((resolve) => {
      if (!localStorage.getItem(path)) {
        localStorage.setItem(path, JSON.stringify([]));
      }

      let items = JSON.parse(localStorage.getItem(path) as any);
      if (this.dataExist(path, data)) {
        items = items.map((item: any) => (item.id === data.id ? data : item));
      } else {
        items = [...items, data];
      }
      localStorage.setItem(path, JSON.stringify(items));

      resolve(true);
    });
  }

  dataExist(path: string, data: any) {
    if (!localStorage.getItem(path)) {
      return;
    }

    const items = JSON.parse(localStorage.getItem(path) as any);
    return items.find((item: any) => item.id === data.id);
  }

  getItems(path: string) {
    return new Promise((resolve, reject) => {
      localStorage.getItem(path)
        ? resolve(JSON.parse(localStorage.getItem(path) as any))
        : reject([]);
    });
  }

  async getItem(path: string, dataId: string): Promise<iNote> {
    return await this.getItems(path).then((items: any) => {
      return items.find((item: any) => {
        const decryptedId = this.globals.decrypt(item.id);
        const decryptedDataId = this.globals.decrypt(dataId);
        return decryptedDataId === decryptedId;
      });
    });
  }

  getNewId(path: string) {
    if (!localStorage.getItem(path)) return 1;
    const data = JSON.parse(localStorage.getItem(path) as any);
    const encrpytedId = data[data.length - 1].id;
    const decryptedId = this.globals.decrypt(encrpytedId);
    const newId = Number(decryptedId) + 1;

    return newId;
  }
}
