import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
  AfterViewChecked,
  AfterContentChecked,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { IAuthor, INote } from 'src/app/interface/note';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-previewer',
  templateUrl: './note-previewer.component.html',
  styleUrls: ['./note-previewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotePreviewerComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  @ViewChild('container') container: ElementRef = new ElementRef(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private title: Title
  ) {}

  note: INote | undefined;
  notePreview: any;
  fabOpen = false;
  noteIsAuthor = false;

  async ngOnInit() {
    this.title.setTitle('Note - Preview');

    const id = this.route.snapshot.params['id'];
    this.note = this.noteService.getNote(id) as INote | IAuthor;
  }

  ngAfterViewChecked(): void {
    const id = this.route.snapshot.params['id'];
    this.note = this.noteService.getNote(id) as INote | IAuthor;

    this.noteIsAuthor = this.note?.hasOwnProperty('badge');
    const html = this.container.nativeElement;
    html.innerHTML = this.note!.content;
  }

  toggleFab() {
    this.fabOpen = !this.fabOpen;
  }

  ngOnDestroy(): void {}
}
