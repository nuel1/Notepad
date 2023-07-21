import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/storage/storage.service';
import { Editor } from 'ngx-editor';
import { toolbar } from './editor.config';
import { iNgxEditorJson, iNote } from 'src/app/interface/model';
import { toHTML, toDoc } from 'ngx-editor';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private router: Router
  ) {}
  editor: Editor = new Editor();
  note?: iNote;
  title = '';
  editorToolbarConfig = toolbar;
  html = '';
  plainText = '';
  changes = false;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.note = await this.storage.getItem('notes', id);
    this.title = this.note.title;
  }

  editorChange() {
    const jsonDoc: iNgxEditorJson = toDoc(this.html) as iNgxEditorJson;
    this.plainText = jsonDoc.content[0].content[0].text.trim();
    this.changes = true;
  }

  saveChanges() {
    if (this.note) {
      (this.note.content = this.html), (this.changes = false);
      this.storage.saveItem('notes', this.note);
    }
  }

  previewChanges() {
    if (this.changes)
      localStorage.setItem('unsavedChanges', JSON.stringify(this.html));

    if (this.plainText)
      this.router.navigate(['notes', this.note?.id, 'preview']);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
