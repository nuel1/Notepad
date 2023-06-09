import { NgModule } from '@angular/core';
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
} from '@ng-icons/ionicons';
import { SideNavbarTabComponent } from './side-navbar-tab/side-navbar-tab.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ProfileCardComponent,
    SideNavbarComponent,
    SideNavbarTabComponent,
    SearchComponent,
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
    }),
  ],
  exports: [
    ProfileCardComponent,
    SideNavbarComponent,
    SideNavbarTabComponent,
    SearchComponent,
  ],
})
export class SharedModule {}
