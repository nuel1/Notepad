import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NgxEditorModule } from 'ngx-editor';
import { CoreModule } from 'src/app/core/core.module';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NotePreviewerComponent } from './components/note-previewer/note-previewer.component';
import { NoteFormInputComponent } from './components/note-form-input/note-form-input.component';
import { NoteFormInputErrorComponent } from './components/note-form-input-error/note-form-input-error.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
// Services
import { NoteService } from './services/note.service';

// Directives
import { CustomClickDirective } from './directives/custom-click.directive';

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
    CustomClickDirective,
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    NgxEditorModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CoreModule,
  ],
  providers: [NoteService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotesModule {}
