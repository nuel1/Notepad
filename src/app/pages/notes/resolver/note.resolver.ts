import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { NoteService } from '../services/note.service';
import { inject } from '@angular/core';

export const noteResolver: ResolveFn<boolean | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | null => {
  const noteService = inject(NoteService);
  const id = route.paramMap.get('id') satisfies string | null;
  if (!(typeof id === 'string')) return errorResolver();
  if (noteService.getNote(id) instanceof Error) return errorResolver();
  else return true;
};

const errorResolver = () => {
  const router = inject(Router);
  router.navigateByUrl('error404');
  return null;
};
