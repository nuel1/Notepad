import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NoteService } from '../services/note.service';
import { inject } from '@angular/core';

export const noteResolver: ResolveFn<Promise<boolean>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const noteService = inject(NoteService);
      const id = route.paramMap.get('id') satisfies string | null;
      const note = noteService.getNote(id as string);
      if (note === null) {
        reject(false);
        errorResolver();
      } else resolve(true);
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
