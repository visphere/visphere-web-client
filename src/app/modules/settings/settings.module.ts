/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as BtsIcon from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationBarComponent } from '~/settings-mod/components/navigation-bar/navigation-bar.component';
import { RadioButtonsGroupComponent } from '~/settings-mod/components/radio-buttons-group/radio-buttons-group.component';
import { SettingPanelWrapperComponent } from '~/settings-mod/components/setting-panel-wrapper/setting-panel-wrapper.component';
import { AppearanceSettingsPageComponent } from '~/settings-mod/pages/appearance-settings-page/appearance-settings-page.component';
import { BlankInitSettingsPageComponent } from '~/settings-mod/pages/blank-init-settings-page/blank-init-settings-page.component';
import { FriendRequestsSettingsPageComponent } from '~/settings-mod/pages/friend-requests-settings-page/friend-requests-settings-page.component';
import { LanguageSettingsPageComponent } from '~/settings-mod/pages/language-settings-page/language-settings-page.component';
import { MyAccountSettingsPageComponent } from '~/settings-mod/pages/my-account-settings-page/my-account-settings-page.component';
import { NotificationsSettingsPageComponent } from '~/settings-mod/pages/notifications-settings-page/notifications-settings-page.component';
import { ProfileSettingsPageComponent } from '~/settings-mod/pages/profile-settings-page/profile-settings-page.component';
import { SettingsEntryPointPageComponent } from '~/settings-mod/pages/settings-entry-point-page/settings-entry-point-page.component';
import { SharedModule } from '~/shared-mod/shared.module';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { SettingsRootComponent } from './settings-root.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    AppearanceSettingsPageComponent,
    BlankInitSettingsPageComponent,
    FriendRequestsSettingsPageComponent,
    LanguageSettingsPageComponent,
    MyAccountSettingsPageComponent,
    NavigationBarComponent,
    NotificationsSettingsPageComponent,
    ProfileSettingsPageComponent,
    RadioButtonsGroupComponent,
    SettingPanelWrapperComponent,
    SettingsEntryPointPageComponent,
    SettingsRootComponent,
    ToggleButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgIconsModule.withIcons({
      appearanceIcon: BtsIcon.bootstrapBrush,
      arrowRightIcon: BtsIcon.bootstrapArrowRight,
      closeIcon: BtsIcon.bootstrapXLg,
      downloadIcon: BtsIcon.bootstrapDownload,
      friendRequestsIcon: BtsIcon.bootstrapPersonPlus,
      languageIcon: BtsIcon.bootstrapTranslate,
      logoutIcon: BtsIcon.bootstrapBoxArrowRight,
      myAccountIcon: BtsIcon.bootstrapPerson,
      notificationsIcon: BtsIcon.bootstrapBell,
      profileIcon: BtsIcon.bootstrapPersonGear,
      togglerNoIcon: BtsIcon.bootstrapX,
      togglerYesIcon: BtsIcon.bootstrapCheck,
    }),
    RouterModule,
    SettingsRoutingModule,
    SharedModule,
    TranslateModule,
  ],
})
export class SettingsModule {}
