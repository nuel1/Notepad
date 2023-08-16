import { Injectable } from '@angular/core';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private globals: GlobalsService) {}

  public saveItem(
    path: 'notes' | 'todo-list' | 'reading-list' | 'projects',
    data: any
  ) {
    return new Promise((resolve) => {
      localStorage.setItem(path, JSON.stringify(data));
      resolve(true);
    });
  }

  // dataExist(
  //   path: 'notes' | 'todo-list' | 'reading-list' | 'projects',
  //   data: INote
  // ) {
  //   if (!localStorage.getItem(path)) {
  //     return;
  //   }

  //   const items = JSON.parse(localStorage.getItem(path) as any);
  //   return items.find((item: any) => item.id === data.id);
  // }

  public getItems(path: 'notes' | 'todo-list' | 'reading-list' | 'projects') {
    return localStorage.getItem(path)
      ? JSON.parse(localStorage.getItem(path) as any)
      : [];
  }
}
