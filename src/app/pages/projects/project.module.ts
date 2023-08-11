import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectsComponent } from './projects.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [CommonModule, ProjectRoutingModule, CoreModule],
})
export class ProjectModule {}
