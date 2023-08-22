import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { Observable, Subscription, catchError, combineLatestWith } from 'rxjs';

@Component({
  selector: 'note-editor-fullscreen',
  templateUrl: './note-editor-fullscreen.component.html',
  styleUrls: ['./note-editor-fullscreen.component.scss'],
})
export class NoteEditorFullscreenComponent implements OnInit, OnDestroy {
  @Input() editorToolbarConfig: Toolbar | any;
  @Input() content$: Observable<string> | undefined;
  @Output() onSave = new EventEmitter<string>();

  constructor() {}

  subscription: Subscription | undefined;
  editor: Editor = new Editor();
  refinedEditorToolbarConfig: Array<string[]> | Toolbar | any = [];

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnInit(): void {
    this.removeHeadingTool(this.editorToolbarConfig);
    this.subscription = this.content$?.subscribe(
      (value: string) => this.form.get('editorContent')?.patchValue(value),
      (e) => console.error(e)
    );
  }

  removeHeadingTool(editorToolbarConfig: Toolbar) {
    this.refinedEditorToolbarConfig = editorToolbarConfig.map(
      (toolbarSet: Array<string[] | any>) => {
        return toolbarSet.reduce(
          (
            tools: Array<string>,
            tool: string | Record<string, string[]>
          ): Array<string> => {
            if (typeof tool === 'string') tools = [...tools, tool];
            return tools;
          },
          []
        );
      }
    );
  }

  saveChanges() {
    const content = this.form.get('editorContent')?.value as string;
    this.onSave.emit(content);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
