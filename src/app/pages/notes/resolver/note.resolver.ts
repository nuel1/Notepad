import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NoteService } from '../services/note.service';
import { inject, ChangeDetectorRef } from '@angular/core';
import { INote, IAuthor } from 'src/app/interface/note';
import { StorageService } from 'src/app/core/storage.service';

export const noteResolver: ResolveFn<Promise<boolean>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      // const notes = JSON.parse(localStorage.getItem('notes') as string);

      // console.log(notes);
      resolve(true);
    } catch (e) {
      reject(false);
      errorResolver();
    }
  });
};

const errorResolver = () => {
  const router = inject(Router);
  router.navigateByUrl('error404');
};
