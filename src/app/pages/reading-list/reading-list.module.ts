import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingListRoutingModule } from './reading-list-routing.module';
import { ReadingListComponent } from './reading-list.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [ReadingListComponent],
  imports: [CommonModule, ReadingListRoutingModule, CoreModule],
})
export class ReadingListModule {}
