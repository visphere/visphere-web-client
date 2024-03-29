/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import * as BtsIcon from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { AccountAuthSettingsComponent } from '~/settings-mod/components/account-auth-settings/account-auth-settings.component';
import { AccountPanelSettingsComponent } from '~/settings-mod/components/account-panel-settings/account-panel-settings.component';
import { BirthDateUpdatableModalComponent } from '~/settings-mod/components/birth-date-updatable-modal/birth-date-updatable-modal.component';
import { ColorsSelectorListComponent } from '~/settings-mod/components/colors-selector-list/colors-selector-list.component';
import { CreateJoinLinkModalComponent } from '~/settings-mod/components/create-join-link-modal/create-join-link-modal.component';
import { DevastateAccountModalComponent } from '~/settings-mod/components/devastate-account-modal/devastate-account-modal.component';
import { EditablePrimitiveValueComponent } from '~/settings-mod/components/editable-primitive-value/editable-primitive-value.component';
import { EmailAddressUpdatableModalComponent } from '~/settings-mod/components/email-address-updatable-modal/email-address-updatable-modal.component';
import { FullNameUpdatableModalComponent } from '~/settings-mod/components/full-name-updatable-modal/full-name-updatable-modal.component';
import { NavigationBarComponent } from '~/settings-mod/components/navigation-bar/navigation-bar.component';
import { PasswordUpdatableModalComponent } from '~/settings-mod/components/password-updatable-modal/password-updatable-modal.component';
import { RadioButtonsGroupComponent } from '~/settings-mod/components/radio-buttons-group/radio-buttons-group.component';
import { SecondEmailAddressUpdatableModalComponent } from '~/settings-mod/components/second-email-address-updatable-modal/second-email-address-updatable-modal.component';
import { SettingPanelWrapperComponent } from '~/settings-mod/components/setting-panel-wrapper/setting-panel-wrapper.component';
import { ToggleButtonComponent } from '~/settings-mod/components/toggle-button/toggle-button.component';
import { UpdatableEmailFinishFormComponent } from '~/settings-mod/components/updatable-email-finish-form/updatable-email-finish-form.component';
import { UpdatableEmailStartFormComponent } from '~/settings-mod/components/updatable-email-start-form/updatable-email-start-form.component';
import { UpdatableTextChannelFormComponent } from '~/settings-mod/components/updatable-text-channel-form/updatable-text-channel-form.component';
import { UpdateJoinLinkModalComponent } from '~/settings-mod/components/update-join-link-modal/update-join-link-modal.component';
import { UserAccountBannerComponent } from '~/settings-mod/components/user-account-banner/user-account-banner.component';
import { UsernameUpdatableModalComponent } from '~/settings-mod/components/username-updatable-modal/username-updatable-modal.component';
import { AppearanceSettingsPageComponent } from '~/settings-mod/pages/appearance-settings-page/appearance-settings-page.component';
import { BlankInitSettingsPageComponent } from '~/settings-mod/pages/blank-init-settings-page/blank-init-settings-page.component';
import { GuildAppearanceSettingsPageComponent } from '~/settings-mod/pages/guild-appearance-settings-page/guild-appearance-settings-page.component';
import { GuildBansSettingsPageComponent } from '~/settings-mod/pages/guild-bans-settings-page/guild-bans-settings-page.component';
import { GuildJoinLinksSettingsPageComponent } from '~/settings-mod/pages/guild-join-links-settings-page/guild-join-links-settings-page.component';
import { GuildOverviewSettingsPageComponent } from '~/settings-mod/pages/guild-overview-settings-page/guild-overview-settings-page.component';
import { GuildSettingsEntryPointPageComponent } from '~/settings-mod/pages/guild-settings-entry-point-page/guild-settings-entry-point-page.component';
import { LanguageSettingsPageComponent } from '~/settings-mod/pages/language-settings-page/language-settings-page.component';
import { MyAccountSettingsPageComponent } from '~/settings-mod/pages/my-account-settings-page/my-account-settings-page.component';
import { NotificationsSettingsPageComponent } from '~/settings-mod/pages/notifications-settings-page/notifications-settings-page.component';
import { ProfileSettingsPageComponent } from '~/settings-mod/pages/profile-settings-page/profile-settings-page.component';
import { SettingsEntryPointPageComponent } from '~/settings-mod/pages/settings-entry-point-page/settings-entry-point-page.component';
import { TextChannelOverviewSettingsPageComponent } from '~/settings-mod/pages/text-channel-overview-settings-page/text-channel-overview-settings-page.component';
import { TextChannelSettingsEntryPointPageComponent } from '~/settings-mod/pages/text-channel-settings-entry-point-page/text-channel-settings-entry-point-page.component';
import { SharedModule } from '~/shared-mod/shared.module';
import { SettingsRootComponent } from './settings-root.component';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    AccountAuthSettingsComponent,
    AccountPanelSettingsComponent,
    AppearanceSettingsPageComponent,
    BirthDateUpdatableModalComponent,
    BlankInitSettingsPageComponent,
    ColorsSelectorListComponent,
    CreateJoinLinkModalComponent,
    DevastateAccountModalComponent,
    EditablePrimitiveValueComponent,
    EmailAddressUpdatableModalComponent,
    FullNameUpdatableModalComponent,
    GuildAppearanceSettingsPageComponent,
    GuildBansSettingsPageComponent,
    GuildJoinLinksSettingsPageComponent,
    GuildOverviewSettingsPageComponent,
    GuildSettingsEntryPointPageComponent,
    LanguageSettingsPageComponent,
    MyAccountSettingsPageComponent,
    NavigationBarComponent,
    NotificationsSettingsPageComponent,
    PasswordUpdatableModalComponent,
    ProfileSettingsPageComponent,
    RadioButtonsGroupComponent,
    SecondEmailAddressUpdatableModalComponent,
    SettingPanelWrapperComponent,
    SettingsEntryPointPageComponent,
    SettingsRootComponent,
    TextChannelOverviewSettingsPageComponent,
    TextChannelSettingsEntryPointPageComponent,
    ToggleButtonComponent,
    UpdatableEmailFinishFormComponent,
    UpdatableEmailStartFormComponent,
    UpdatableTextChannelFormComponent,
    UpdateJoinLinkModalComponent,
    UserAccountBannerComponent,
    UsernameUpdatableModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgIconsModule.withIcons({
      appearanceIcon: BtsIcon.bootstrapBrush,
      arrowRightIcon: BtsIcon.bootstrapArrowRight,
      bannedUserIcon: BtsIcon.bootstrapPersonLock,
      copyIcon: BtsIcon.bootstrapClipboardCheck,
      closeIcon: BtsIcon.bootstrapXLg,
      editIcon: BtsIcon.bootstrapPencilSquare,
      joinLinksIcon: BtsIcon.bootstrapPersonPlus,
      languageIcon: BtsIcon.bootstrapTranslate,
      logoutIcon: BtsIcon.bootstrapBoxArrowRight,
      myAccountIcon: BtsIcon.bootstrapPerson,
      notificationsIcon: BtsIcon.bootstrapBell,
      profileIcon: BtsIcon.bootstrapPersonGear,
      settingsIcon: BtsIcon.bootstrapGear,
      togglerNoIcon: BtsIcon.bootstrapX,
      togglerYesIcon: BtsIcon.bootstrapCheck,
      unbanIcon: BtsIcon.bootstrapArrowCounterclockwise,
    }),
    NgxTippyModule,
    ReactiveFormsModule,
    RouterModule,
    SettingsRoutingModule,
    SharedModule,
    TranslateModule,
  ],
})
export class SettingsModule {}
