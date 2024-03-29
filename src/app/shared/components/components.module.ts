import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { SideNavbarTabComponent } from './side-navbar-tab/side-navbar-tab.component';
import { SearchComponent } from './search/search.component';
import { ModalDeleteComponent } from './modal/modal-delete/modal-delete.component';
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
  ionMenuOutline,
  // ionAnalyticsSharp,
  // ionCaretDownOutline,
  // ionCopy,
  // ionCopyOutline,
  // ionClipboard,
  // ionEllipsisVerticalSharp,
  // ionPaperPlane,
  // ionPaperPlaneOutline,
  // ionShare,
  // ionShareOutline,
} from '@ng-icons/ionicons';
import { NetworkStatusToastComponent } from './network-status-toast/network-status-toast.component';

const components = [
  ProfileCardComponent,
  SideNavbarComponent,
  SideNavbarTabComponent,
  SearchComponent,
  ModalDeleteComponent,
  NetworkStatusToastComponent,
];
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
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
      ionMenuOutline,
    }),
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    NgIconsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ...components,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
