import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationPagesComponent } from './application-pages.component';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { JournalComponent } from './journal/journal.component';
import { EditorComponent } from './journal/editor/editor.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationPagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'journal',
        component: JournalComponent,
        children: [
          {
            path: 'editor',
            component: EditorComponent,
          },
        ],
      },
      {
        path: 'notes',
        component: NotesComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'reading-list',
        component: ReadingListComponent,
      },
      {
        path: 'todo-list',
        component: TodoListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationPagesRoutingModule {}
