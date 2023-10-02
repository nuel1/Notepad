import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NoteService } from '../services/note.service';
import { inject, ChangeDetectorRef } from '@angular/core';
import { INote, IAuthor } from 'src/app/interface/note';

export const noteResolver: ResolveFn<Promise<boolean>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    try {
      const noteService = inject(NoteService);
      const id = route.paramMap.get('id') satisfies string | null;

      console.log(noteService.notes());
      const note = noteService.notes().find((note: INote | IAuthor) => {
        return id === note.id;
      }) satisfies INote | IAuthor | undefined;

      if (note) {
        resolve(true);
      } else {
        reject(false);
        errorResolver();
      }
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
