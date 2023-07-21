import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalsService } from './globals/globals.service';
import { StorageService } from './storage/storage.service';
@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [GlobalsService, StorageService],
})
export class CoreModule {}
