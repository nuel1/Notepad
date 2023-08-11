import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalsService } from './globals.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [GlobalsService, StorageService, UserService],
})
export class CoreModule {}
