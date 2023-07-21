import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { NgIconsModule } from '@ng-icons/core';
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
import { SideNavbarTabComponent } from './side-navbar-tab/side-navbar-tab.component';
import { SearchComponent } from './search/search.component';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteFormComponent } from './forms/note-form/note-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { DeleteNoteModalComponent } from './modals/delete-note-modal/delete-note-modal.component';

@NgModule({
  declarations: [
    ProfileCardComponent,
    SideNavbarComponent,
    SideNavbarTabComponent,
    SearchComponent,
    NoteCardComponent,
    NoteFormComponent,
    DeleteNoteModalComponent,
  ],
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
  exports: [
    ProfileCardComponent,
    SideNavbarComponent,
    SideNavbarTabComponent,
    SearchComponent,
    NgIconsModule,
    NoteCardComponent,
    NoteFormComponent,
    NgxEditorModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
