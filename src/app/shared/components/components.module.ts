import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { SideNavbarTabComponent } from './side-navbar-tab/side-navbar-tab.component';
import { SearchComponent } from './search/search.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteFormComponent } from './forms/note-form/note-form.component';
import {
  ionNewspaperOutline,
  ionCheckmarkOutline,
  ionJournalOutline,
  ionBookOutline,
  ionAddOutline,
  ionSettingsOutline,
  ionChevronDownOutline,
  ionSearchOutline,
  ionHomeOutline,
  ionEllipsisHorizontal,
  ionCloseCircle,
  ionChevronForward,
  ionPencil,
} from '@ng-icons/ionicons';

const components = [
  ProfileCardComponent,
  SideNavbarComponent,
  SideNavbarTabComponent,
  SearchComponent,
  NoteCardComponent,
  NoteFormComponent,
];
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    NgIconsModule.withIcons({
      ionAddOutline,
      ionBookOutline,
      ionSettingsOutline,
      ionJournalOutline,
      ionCheckmarkOutline,
      ionNewspaperOutline,
      ionChevronDownOutline,
      ionSearchOutline,
      ionHomeOutline,
      ionEllipsisHorizontal,
      ionCloseCircle,
      ionChevronForward,
      ionPencil,
    }),
    ReactiveFormsModule,
    FormsModule,
    NgxEditorModule,
  ],
  exports: [NgIconsModule, NgxEditorModule, ...components],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
