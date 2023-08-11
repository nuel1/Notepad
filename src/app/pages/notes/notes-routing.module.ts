import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotePreviewerComponent } from './components/note-previewer/note-previewer.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NotesComponent } from './notes.component';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: 'note/preview/:id',
        component: NotePreviewerComponent,
      },
      {
        path: 'note/preview/:id/edit',
        component: NoteEditorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
