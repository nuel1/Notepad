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
import { Editor, Toolbar, ToolbarItem, Validators } from 'ngx-editor';
import { Observable, Subscription } from 'rxjs';

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

  constructor() {
    this.form = new FormGroup({
      editorContent: new FormControl('', Validators.required()),
    });
  }

  subscription: Subscription | undefined;
  editor = new Editor();
  refinedEditorToolbarConfig: Array<string[]> | Toolbar | any = [];
  content = '';
  form: FormGroup | undefined;

  ngOnInit(): void {
    this.removeHeadingTool(this.editorToolbarConfig)
      .cleanUpEmptyArray()
      .removeImageToolAndLinkTool()
      .removeColorTool();

    this.subscription = this.content$?.subscribe(
      (value: string) => this.form?.get('editorContent')?.patchValue(value),
      (e) => console.error(e)
    );
  }

  removeHeadingTool(editorToolbarConfig: Toolbar) {
    this.refinedEditorToolbarConfig = editorToolbarConfig.map(
      (toolbarSet: Array<string[] | ToolbarItem>) => {
        return toolbarSet.reduce(
          (tools: Array<string>, tool: Array<string> | ToolbarItem) => {
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
        return !toolSet[0].match(/_color$/) && !toolSet[1].match(/_color$/);
      }
    );
    return this;
  }

  cleanUpEmptyArray() {
    this.refinedEditorToolbarConfig = this.refinedEditorToolbarConfig.filter(
      (toolSet: Array<string>) => Boolean(toolSet.length)
    );
    return this;
  }

  saveChanges() {
    this.content = this.form?.get('editorContent')?.value as string;
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
