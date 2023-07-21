import {
  Component,
  ElementRef,
  EventEmitter,
  ViewChild,
  Input,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/core/globals/globals.service';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { iNote } from 'src/app/interface/model';

@Component({
  selector: 'note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent {
  constructor(
    private storage: StorageService,
    private globals: GlobalsService,
    private router: Router,
    private user: UserService
  ) {}

  @Output() createNote = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @ViewChild('inputtag') inputTag: ElementRef = new ElementRef(null);

  title = new FormControl('', Validators.required);
  tags: string[] = [];
  tag = '';

  async onCreateNote() {
    const id = await this.user.createNote(
      this.tags,
      this.title.value as string
    );
    this.router.navigate(['notes', id, 'editor']);
    this.createNote.emit(true);
  }

  onCancel() {
    this.cancel.emit(true);
  }

  addTag() {
    const newTag = this.tag;
    this.tags.push(newTag);
    this.inputTag.nativeElement.value = '';
  }
}
