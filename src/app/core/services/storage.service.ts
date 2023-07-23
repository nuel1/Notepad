import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';
import { INote } from '../../interface/note';

@Injectable()
export class StorageService {
  constructor(private globals: GlobalsService) {}

  saveItem(
    path: 'notes' | 'todo-list' | 'reading-list' | 'projects',
    data: any
  ) {
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

  dataExist(
    path: 'notes' | 'todo-list' | 'reading-list' | 'projects',
    data: any
  ) {
    if (!localStorage.getItem(path)) {
      return;
    }

    const items = JSON.parse(localStorage.getItem(path) as any);
    return items.find((item: any) => item.id === data.id);
  }

  async getItems(path: 'notes' | 'todo-list' | 'reading-list' | 'projects') {
    return await new Promise((resolve, reject) => {
      localStorage.getItem(path)
        ? resolve(JSON.parse(localStorage.getItem(path) as any))
        : reject([]);
    });
  }
}
