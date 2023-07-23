import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/storage/storage.service';
import { INote } from 'src/app/interface/model';

@Component({
  selector: 'app-note-previewer',
  templateUrl: './note-previewer.component.html',
  styleUrls: ['./note-previewer.component.scss'],
})
export class NotePreviewerComponent implements OnInit {
  @ViewChild('container') container: ElementRef = new ElementRef(null);

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private router: Router
  ) {}

  note?: INote;

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.note = await this.storage.getItem('notes', id);
    const html = this.container.nativeElement;
    html.innerHTML = this.note.content;
  }

  routeToEditor() {
    // this.router.navigateByUrl('./notes/note/editor/' + this.note?.id);
    this.router.navigate(['/notes', 'note', 'editor', this.note?.id]);
  }
}
