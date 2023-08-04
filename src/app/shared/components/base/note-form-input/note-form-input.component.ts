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
  @Input() name = '';
  @Input() inputTitle = '';
  @Input() placeholder = '';
  @Output() inputChange = new EventEmitter<string>();
  @Output() addTag = new EventEmitter<string[]>();
  @Output() deleteTag = new EventEmitter<string[]>();

  tags: string[] = [];
  subscription: Subscription | undefined;

  formTitle = new FormControl('', Validators.required);
  formTag = new FormControl('');

  constructor() {
    this.subscription = this.formTitle.valueChanges.subscribe((input) =>
      this.inputChange.emit(input as string)
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onAddNewTag() {
    if (this.formTag.value) {
      this.tags = [...this.tags, this.formTag.value];
      this.addTag.emit(this.tags);
      if (this.inputEl !== undefined) this.inputEl.nativeElement.value = '';
    }
  }

  onDeleteTag(tag: string) {
    this.tags.splice(this.tags.indexOf(tag), 1);
    this.deleteTag.emit(this.tags);
  }

  trackByTagName(index: number, tag: string): string {
    return tag;
  }
}
