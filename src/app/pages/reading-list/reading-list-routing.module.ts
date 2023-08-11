import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingListComponent } from './reading-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ReadingListComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ReadingListRoutingModule {}
