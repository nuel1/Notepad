import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
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
  @Output() onExitFullScreen = new EventEmitter<string>();
  @Output() onPreview = new EventEmitter<string>();

  constructor() {}

  subscription: Subscription | undefined;
  editor: Editor = new Editor();
  refinedEditorToolbarConfig: Array<string[]> | Toolbar | any = [];
  content = '';

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  });

  ngOnInit(): void {
    this.removeHeadingTool(this.editorToolbarConfig)
      .removeImageToolAndLinkTool()
      .removeColorTool()
      .cleanUpEmptyArray();

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
    return this;
  }

  removeImageToolAndLinkTool() {
    this.refinedEditorToolbarConfig = this.refinedEditorToolbarConfig.filter(
      (toolSet: Array<string>) => {
        return !toolSet.includes('link') || !toolSet.includes('image');
      }
    );

    return this;
  }

  removeColorTool() {
    this.refinedEditorToolbarConfig = this.refinedEditorToolbarConfig.filter(
      (toolSet: Array<string>) => {
        return (
          toolSet.length === 2 &&
          !toolSet[0].match(/_color$/) &&
          !toolSet[1].match(/_color$/)
        );
      }
    );
    return this;
  }

  cleanUpEmptyArray() {
    this.refinedEditorToolbarConfig = this.refinedEditorToolbarConfig.filter(
      (toolSet: Array<string>) => Boolean(toolSet.length)
    );
  }

  saveChanges() {
    this.content = this.form.get('editorContent')?.value as string;
  }

  previewChanges() {
    this.saveChanges();
    this.onPreview.emit(this.content);
  }

  exitFullScreen() {
    this.saveChanges();
    this.onExitFullScreen.emit(this.content);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
