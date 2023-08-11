import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoListRoutingModule } from './todo-list-routing.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [TodoListComponent],
  imports: [CommonModule, TodoListRoutingModule, CoreModule],
})
export class TodoListModule {}
