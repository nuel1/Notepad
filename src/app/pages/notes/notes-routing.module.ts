import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotePreviewerComponent } from './components/note-previewer/note-previewer.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NotesComponent } from './notes.component';
import { noteResolver } from './resolver/note.resolver';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: 'note/preview/:id',
        component: NotePreviewerComponent,
        // resolve: {
        //   note: noteResolver,
        // },
      },
      {
        path: 'note/preview/:id/edit',
        component: NoteEditorComponent,
        // resolve: {
        //   note: noteResolver,
        // },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
