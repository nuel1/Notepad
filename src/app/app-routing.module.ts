import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'journal',
    loadChildren: () =>
      import('./pages/journal/journal.module').then((m) => m.JournalModule),
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('./pages/notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/project.module').then((m) => m.ProjectModule),
  },
  {
    path: 'reading-list',
    loadChildren: () =>
      import('./pages/reading-list/reading-list.module').then(
        (m) => m.ReadingListModule
      ),
  },
  {
    path: 'todo-list',
    loadChildren: () =>
      import('./pages/todo-list/todo-list.module').then(
        (m) => m.TodoListModule
      ),
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
