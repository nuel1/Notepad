import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterContentInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalsService } from 'src/app/core/services/globals.service';
import { NoteService } from 'src/app/core/services/note.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { INote } from 'src/app/interface/note';

@Component({
  selector: 'app-note-previewer',
  templateUrl: './note-previewer.component.html',
  styleUrls: ['./note-previewer.component.scss'],
})
export class NotePreviewerComponent implements OnInit, AfterContentInit {
  @ViewChild('container') container: ElementRef = new ElementRef(null);

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private globalService: GlobalsService
  ) {}

  note: INote | undefined;

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.note = (await this.noteService.getNote(id)) as INote;
    const html = this.container.nativeElement;
    this.note.content.length
      ? (html.innerHTML = this.note.content)
      : (html.innerHTML = '');
  }

  async ngAfterContentInit() {
    // const id = this.route.snapshot.params['id'];
    // this.note = (await this.noteService.getNote(id)) as INote;
    // const html = this.container.nativeElement;
    // console.log(this.note);
    // this.note.content.length
    //   ? (html.innerHTML = this.note.content)
    //   : (html.innerHTML = '');
  }

  encryptID(noteID: string) {
    return this.globalService.encrypt(noteID);
  }
}
