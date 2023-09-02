import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { IAuthor, INote } from 'src/app/interface/note';

@Component({
  selector: 'app-note-previewer',
  templateUrl: './note-previewer.component.html',
  styleUrls: ['./note-previewer.component.scss'],
})
export class NotePreviewerComponent
  implements OnInit, OnDestroy, AfterViewInit
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

  async ngOnInit() {
    this.title.setTitle('Note - Preview');

    const id = this.route.snapshot.params['id'];
    try {
    } catch (e) {}
    this.note = this.noteService.getNote(id) as INote | IAuthor;
    this.notePreview = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        try {
          const id = this.route.snapshot.params['id'];
          const note = this.noteService.getNote(id) satisfies
            | INote
            | IAuthor
            | Error
            | null;

          if (note && !(note instanceof Error)) {
            this.note = note;
            this.previewNote();
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  get noteIsAuthor() {
    return this.note?.hasOwnProperty('badge');
  }

  ngAfterViewInit(): void {
    this.previewNote();
  }

  async previewNote() {
    const html = this.container.nativeElement;
    html.innerHTML = this.note!.content;
  }

  ngOnDestroy(): void {
    this.notePreview.unsubscribe();
  }
}
