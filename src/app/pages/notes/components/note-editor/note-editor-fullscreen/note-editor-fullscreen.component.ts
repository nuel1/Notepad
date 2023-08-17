import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'note-editor-fullscreen',
  templateUrl: './note-editor-fullscreen.component.html',
  styleUrls: ['./note-editor-fullscreen.component.scss'],
})
export class NoteEditorFullscreenComponent implements OnDestroy {
  @Input() editor: Editor | any;
  @Input() editorToolbarConfig: Toolbar | any;
  @Input() content$: Observable<string> | undefined;
  @Output() onSave = new EventEmitter<string>();

  constructor() {
    this.subscription = this.content$?.subscribe((value: string) =>
      this.form.get('editorContent')?.patchValue(value)
    );
  }

  subscription: Subscription | undefined;

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  saveChanges() {
    const content = this.form.get('editorContent')?.value as string;
    this.onSave.emit(content);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
