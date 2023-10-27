import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Input,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Validators } from 'ngx-editor';
import { toolbar } from './editor.config';
import { IAuthor, INote } from 'src/app/interface/note';
import { NoteService } from '../../services/note.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EventService } from 'src/app/core/event.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteEditorComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public noteService: NoteService,
    private browserTitle: Title,
    public eventService: EventService
  ) {
    this.form = new FormGroup({
      editorContent: new FormControl('', Validators.required()),
    });
  }

  editor = new Editor();
  note: INote | undefined;
  title = '';
  editorToolbarConfig = toolbar;
  html = '';
  contentChangeObserver$ = new BehaviorSubject<string>('');
  tagName = new FormControl('', Validators.required());
  subscription: Subscription | undefined;
  form: FormGroup | undefined;

  async ngOnInit() {
    this.subscription = this.form?.valueChanges.subscribe(
      ({ editorContent }) => {
        this.contentChangeObserver$.next(editorContent satisfies string);
      }
    );

    this.browserTitle.setTitle('Note - Edit');
    try {
      const id = this.route.snapshot.paramMap.get('id') satisfies null | string;
      if (!id) throw Error('Id not found');
      const note = this.noteService.getNote(id) satisfies
        | INote
        | IAuthor
        | null
        | Error;

      if (note && !(note instanceof Error)) {
        this.note = note satisfies INote | IAuthor;
        this.form?.get('editorContent')!.patchValue(this.note.content);
        this.contentChangeObserver$.next(
          this.form?.get('editorContent')?.value satisfies string
        );
        return;
      }
    } catch (e) {
      console.log('error:', e);
    }
  }

  previewNote() {
    const note = this.note as INote;
    note.content = this.form?.get('editorContent')!.value as string;
    this.noteService.saveEditedNote(note);
    this.router.navigateByUrl('/notes/note/preview/' + note.id);
  }

  contentFromFullscreen_preview(content: string) {
    this.form?.get('editorContent')?.patchValue(content);
    this.previewNote();
  }

  addTag() {
    const newTag = this.tagName.value as string;
    if (newTag) {
      this.note?.tags.push(newTag);
      this.note && this.noteService.saveEditedNote(this.note);
      this.tagName.setValue('');
    }
  }

  deleteTag(tag: string) {
    this.note?.tags.splice(this.note.tags.indexOf(tag), 1);
    this.noteService.saveEditedNote(this.note as INote);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.subscription?.unsubscribe();
  }
}
