import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NgxEditorModule } from 'ngx-editor';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NotePreviewerComponent } from './components/note-previewer/note-previewer.component';
import { NoteFormInputComponent } from './components/note-form-input/note-form-input.component';
import { NoteFormInputErrorComponent } from './components/note-form-input-error/note-form-input-error.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NoteService } from './services/note.service';
import { InputTagToggleDirective } from './directives/input-tag-toggle.directive';
import { NoteEditorFullscreenComponent } from './components/note-editor/note-editor-fullscreen/note-editor-fullscreen.component';
import { NoteOptionsComponent } from './components/note-options/note-options.component';
import { CreateFolderComponent } from './components/create-folder/create-folder.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { EditTitleComponent } from './components/edit-title/edit-title.component';

@NgModule({
  declarations: [
    NotesComponent,
    NoteCardComponent,
    NoteEditorComponent,
    NoteFormComponent,
    NotePreviewerComponent,
    NoteFormComponent,
    NoteFormInputComponent,
    NoteFormInputErrorComponent,
    InputTagToggleDirective,
    NoteEditorFullscreenComponent,
    NoteOptionsComponent,
    CreateFolderComponent,
    CreateNoteComponent,
    EditTitleComponent,
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    NgxEditorModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [NoteService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotesModule {}
