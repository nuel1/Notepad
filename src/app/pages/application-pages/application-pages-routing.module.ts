import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationPagesComponent } from './application-pages.component';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { JournalComponent } from './journal/journal.component';
import { NoteEditorComponent } from './notes/note-editor/note-editor.component';
import { NotePreviewerComponent } from './notes/note-previewer/note-previewer.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationPagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        data: { title: 'Home' },
      },
      {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home' },
      },
      {
        path: 'journal',
        component: JournalComponent,
        data: { title: 'Journal' },
      },
      {
        path: 'notes',
        component: NotesComponent,
        children: [
          {
            path: ':id/editor',
            component: NoteEditorComponent,
            data: { title: 'Notes' },
          },
          {
            path: ':id/preview',
            component: NotePreviewerComponent,
            data: { title: 'Notes' },
          },
        ],
        data: { title: 'Notes' },
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: { title: 'Projects' },
      },
      {
        path: 'reading-list',
        component: ReadingListComponent,
        data: { title: 'Reading list' },
      },
      {
        path: 'todo-list',
        component: TodoListComponent,
        data: { title: 'Todo list' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationPagesRoutingModule {}
