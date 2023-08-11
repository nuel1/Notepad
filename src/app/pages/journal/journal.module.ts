import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalRoutingModule } from './journal-routing.module';
import { JournalComponent } from './journal.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [JournalComponent],
  imports: [CommonModule, JournalRoutingModule, ComponentsModule, CoreModule],
})
export class JournalModule {}
