import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalsService } from './services/globals.service';
import { StorageService } from './services/storage.service';
import { NoteService } from './services/note.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [GlobalsService, StorageService, UserService, NoteService],
})
export class CoreModule {}
