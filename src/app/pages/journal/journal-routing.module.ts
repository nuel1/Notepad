import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalComponent } from './journal.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: JournalComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class JournalRoutingModule {}
