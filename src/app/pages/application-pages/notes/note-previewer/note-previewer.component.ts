import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { GlobalsService } from 'src/app/core/services/globals.service';
import { NoteService } from 'src/app/core/services/note.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { INote } from 'src/app/interface/note';

@Component({
  selector: 'app-note-previewer',
  templateUrl: './note-previewer.component.html',
  styleUrls: ['./note-previewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotePreviewerComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('container') container: ElementRef = new ElementRef(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService,
    private globalService: GlobalsService,
    private title: Title
  ) {}

  note: INote | undefined;
  notePreview: any;

  async ngOnInit() {
    this.title.setTitle('Note - Preview');

    const id = this.route.snapshot.params['id'];
    this.note = this.noteService.getNote(id) as INote;
    this.notePreview = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const id = this.route.snapshot.params['id'];
        this.note = this.noteService.getNote(id) as INote;
        this.previewNote();
      }
    });
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
