import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationPagesRoutingModule } from './application-pages-routing.module';
import { ApplicationPagesComponent } from './application-pages.component';
import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReadingListComponent } from './reading-list/reading-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { JournalComponent } from './journal/journal.component';
import { NoteEditorComponent } from './notes/note-editor/note-editor.component';
import { NotePreviewerComponent } from './notes/note-previewer/note-previewer.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DirectiveModule } from 'src/app/shared/directives/directive.module';

const pages = [
  ApplicationPagesComponent,
  HomeComponent,
  NotesComponent,
  ProjectsComponent,
  ReadingListComponent,
  TodoListComponent,
  JournalComponent,
  NoteEditorComponent,
  NotePreviewerComponent,
];
@NgModule({
  declarations: pages,
  imports: [
    CommonModule,
    ApplicationPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    DirectiveModule,
  ],
})
export class ApplicationPagesModule {}
