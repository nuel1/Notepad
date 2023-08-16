import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingListRoutingModule } from './reading-list-routing.module';
import { ReadingListComponent } from './reading-list.component';

@NgModule({
  declarations: [ReadingListComponent],
  imports: [CommonModule, ReadingListRoutingModule],
})
export class ReadingListModule {}
