import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/storage/storage.service';
import { iNote } from 'src/app/interface/model';

@Component({
  selector: 'app-note-previewer',
  templateUrl: './note-previewer.component.html',
  styleUrls: ['./note-previewer.component.scss'],
})
export class NotePreviewerComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef = new ElementRef(null);

  constructor(
    private route: ActivatedRoute,
    private storage: StorageService,
    private router: Router
  ) {
    const id = route.snapshot.params['id'];
    storage.getItem('notes', id).then((result: iNote) => (this.note = result));
  }

  note?: iNote;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const html = this.container.nativeElement;
    if (this.note) html.innerHTML = this.note.content;
  }

  editNote() {
    this.router.navigate(['notes', this.note?.id, 'editor']);
  }
}
