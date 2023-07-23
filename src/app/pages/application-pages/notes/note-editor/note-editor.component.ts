import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Validators } from 'ngx-editor';
import { toolbar } from './editor.config';
import { INgxEditorJson } from 'src/app/interface/ngx-editor';
import { INote } from 'src/app/interface/note';
import { toHTML, toDoc } from 'ngx-editor';
import { NoteService } from 'src/app/core/services/note.service';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private router: Router,
    private noteService: NoteService
  ) {}
  editor = new Editor();
  note: INote | undefined;
  title = '';
  editorToolbarConfig = toolbar;
  html = '';
  plainText = '';
  form: FormGroup | any;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.note = (await this.noteService.getNote(id)) as INote;
    this.title = this.note.title;

    this.form = new FormGroup({
      editorContent: new FormControl(
        {
          value: this.note.content,
          disabled: false,
        },
        Validators.required()
      ),
    });

    this.form.get('editorContent').valueChanges.subscribe((value: string) => {
      this.note!.content = value;
      this.storage.saveItem('notes', this.note);
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
