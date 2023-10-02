import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'note-form-input',
  templateUrl: './note-form-input.component.html',
  styleUrls: ['./note-form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteFormInputComponent implements OnDestroy {
  @ViewChild('tagInput') inputEl: ElementRef | undefined;
  @Input() name?: 'title' | 'tag' = 'title';
  @Input() inputTitle = '';
  @Input() placeholder = '';
  @Input() set initialTitle(value: string) {
    if (value) this.formTitle.setValue(value);
  }
  @Output() onInputChange = new EventEmitter<string>();
  @Output() onAddTag = new EventEmitter<string[]>();
  @Output() onDeleteTag = new EventEmitter<string[]>();

  tags: string[] = [];
  subscription: Subscription | undefined;

  formTitle = new FormControl('', Validators.required);
  formTag = new FormControl('');

  constructor() {
    this.subscription = this.formTitle.valueChanges.subscribe((input) =>
      this.onInputChange.emit(input as string)
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  addTag() {
    if (this.formTag.value) {
      this.tags = [...this.tags, this.formTag.value];
      this.onAddTag.emit(this.tags);
      if (this.inputEl !== undefined) this.inputEl.nativeElement.value = '';
    }
  }

  deleteTag(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.onDeleteTag.emit(this.tags);
  }

  trackByTagName(index: number, tag: string): string {
    return tag;
  }
}
