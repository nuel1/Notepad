import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalsService } from './globals.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { EventService } from './event.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  // providers: [GlobalsService, StorageService, UserService, EventService],
})
export class CoreModule {}
