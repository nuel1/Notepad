import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  AfterViewChecked,
  WritableSignal,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { IAuthor, INote } from 'src/app/interface/note';
import { BehaviorSubject, Subscription } from 'rxjs';
import { toDoc } from 'ngx-editor';
import { INgxEditorJson } from 'src/app/interface/ngx-editor';

@Component({
  selector: 'app-note-previewer',
  templateUrl: './note-previewer.component.html',
  styleUrls: ['./note-previewer.component.scss'],
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

  audioElement = document.createElement('audio');

  note: INote | undefined;
  notePreview: any;
  fabOpen = false;
  noteIsAuthor = false;
  subsriptions: Subscription[] | undefined;
  id: BehaviorSubject<string> = new BehaviorSubject('');
  dataChanged: WritableSignal<boolean> = signal(false);
  loading: WritableSignal<boolean> = signal(false);

  async ngOnInit() {
    this.title.setTitle('Note - Preview');
    this.id.next(this.route.snapshot.params['id']);

    const subscriptionOne = this.id.subscribe((id: string) => {
      this.note = this.noteService.getNote(id) as INote | IAuthor;
      this.noteIsAuthor = this.note?.hasOwnProperty('badge');
      this.dataChanged.set(true);
    });

    const subscriptionTwo = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.id.next(this.route.snapshot.params['id']);
      }
    });

    this.subsriptions = [subscriptionOne, subscriptionTwo];
  }

  ngAfterViewChecked(): void {
    const html = this.container.nativeElement;
    if (this.note) html.innerHTML = this.note!.content;
  }

  toggleFab() {
    this.fabOpen = !this.fabOpen;
  }

  getDoc() {
    if (this.note) {
      const jsonDocs = toDoc(this.note.content) as INgxEditorJson;
      return jsonDocs.content.reduce((result: string, obj: any) => {
        if ('content' in obj) {
          obj['content'].forEach((innerObj: any) => {
            result += innerObj['text'];
          });
        }
        return result;
      }, '');
    }
    return null;
  }

  playAudio() {
    if (this.dataChanged()) {
      this.loading.set(true);
      const doc = this.getDoc();
      if (doc) {
        this.noteService.getAudio(doc).subscribe((data) => {
          this.loading.set(false);

          const { elevenlabs } = data;
          const audioURL = elevenlabs.audio_resource_url;
          this.audioElement.setAttribute('src', audioURL);
          this.audioElement.play();
        });
      }
    } else {
      this.audioElement.play();
    }
    this.dataChanged.set(false);
  }

  ngOnDestroy(): void {
    this.subsriptions?.forEach((subsription: Subscription) =>
      subsription.unsubscribe()
    );
  }
}
