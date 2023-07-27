import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Validators } from 'ngx-editor';
import { toolbar } from './editor.config';
import { INote } from 'src/app/interface/note';
import { NoteService } from 'src/app/core/services/note.service';
import { FormControl, FormGroup } from '@angular/forms';

const document = window;

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}
  editor = new Editor();
  note: INote | undefined;
  title = '';
  editorToolbarConfig = toolbar;
  showTagInputField = false;
  html = '';

  tagName = new FormControl('', Validators.required());

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  async ngOnInit() {
    try {
      const id = this.route.snapshot.paramMap.get('id') as string;
      this.note = await this.noteService.getNote(id);

      if (this.note) {
        this.form.get('editorContent')!.patchValue(this.note.content);
        return;
      }
    } catch (e) {
      console.log('error:', e);
    }
  }

  previewNote() {
    this.note!.content = this.form.get('editorContent')!.value as string;
    console.log(this.note?.content);
    const note = this.note as INote;
    this.noteService.saveNote(note);
    this.router.navigateByUrl('/notes/note/preview/' + note.id);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  clickOutside() {
    this.showTagInputField = false;
  }

  addTag() {
    if (this.showTagInputField) {
      const newTag = this.tagName.value as string;
      this.note?.tags.push(newTag);
      this.note && this.noteService.saveNote(this.note);
    }
  }
}
