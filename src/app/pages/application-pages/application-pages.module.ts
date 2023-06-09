import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPagesRoutingModule } from './application-pages-routing.module';
import { ApplicationPagesComponent } from './application-pages.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { JournalComponent } from './journal/journal.component';
import { EditorComponent } from './journal/editor/editor.component';
const pages = [
  ApplicationPagesComponent,
  HomeComponent,
  NotesComponent,
  ProjectsComponent,
  ReadingListComponent,
  TodoListComponent,
  JournalComponent,
  EditorComponent,
];
@NgModule({
  declarations: pages,
  imports: [CommonModule, ApplicationPagesRoutingModule, SharedModule],
})
export class ApplicationPagesModule {}
