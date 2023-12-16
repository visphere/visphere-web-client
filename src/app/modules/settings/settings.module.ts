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
import { DevastateAccountModalComponent } from '~/settings-mod/components/devastate-account-modal/devastate-account-modal.component';
import { EditablePrimitiveValueComponent } from '~/settings-mod/components/editable-primitive-value/editable-primitive-value.component';
import { EmailAddressUpdatableModalComponent } from '~/settings-mod/components/email-address-updatable-modal/email-address-updatable-modal.component';
import { FullNameUpdatableModalComponent } from '~/settings-mod/components/full-name-updatable-modal/full-name-updatable-modal.component';
import { MfaDevastateFormComponent } from '~/settings-mod/components/mfa-devastate-form/mfa-devastate-form.component';
import { NavigationBarComponent } from '~/settings-mod/components/navigation-bar/navigation-bar.component';
import { PasswordUpdatableModalComponent } from '~/settings-mod/components/password-updatable-modal/password-updatable-modal.component';
import { RadioButtonsGroupComponent } from '~/settings-mod/components/radio-buttons-group/radio-buttons-group.component';
import { SecondEmailAddressUpdatableModalComponent } from '~/settings-mod/components/second-email-address-updatable-modal/second-email-address-updatable-modal.component';
import { SettingPanelWrapperComponent } from '~/settings-mod/components/setting-panel-wrapper/setting-panel-wrapper.component';
import { ToggleButtonComponent } from '~/settings-mod/components/toggle-button/toggle-button.component';
import { UpdatableEmailFinishFormComponent } from '~/settings-mod/components/updatable-email-finish-form/updatable-email-finish-form.component';
import { UpdatableEmailStartFormComponent } from '~/settings-mod/components/updatable-email-start-form/updatable-email-start-form.component';
import { UserAccountBannerComponent } from '~/settings-mod/components/user-account-banner/user-account-banner.component';
import { UsernameUpdatableModalComponent } from '~/settings-mod/components/username-updatable-modal/username-updatable-modal.component';
import { AppearanceSettingsPageComponent } from '~/settings-mod/pages/appearance-settings-page/appearance-settings-page.component';
import { BlankInitSettingsPageComponent } from '~/settings-mod/pages/blank-init-settings-page/blank-init-settings-page.component';
import { LanguageSettingsPageComponent } from '~/settings-mod/pages/language-settings-page/language-settings-page.component';
import { MyAccountSettingsPageComponent } from '~/settings-mod/pages/my-account-settings-page/my-account-settings-page.component';
import { NotificationsSettingsPageComponent } from '~/settings-mod/pages/notifications-settings-page/notifications-settings-page.component';
import { ProfileSettingsPageComponent } from '~/settings-mod/pages/profile-settings-page/profile-settings-page.component';
import { SettingsEntryPointPageComponent } from '~/settings-mod/pages/settings-entry-point-page/settings-entry-point-page.component';
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
    DevastateAccountModalComponent,
    EditablePrimitiveValueComponent,
    EmailAddressUpdatableModalComponent,
    FullNameUpdatableModalComponent,
    LanguageSettingsPageComponent,
    MfaDevastateFormComponent,
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
    ToggleButtonComponent,
    UserAccountBannerComponent,
    UsernameUpdatableModalComponent,
    UpdatableEmailFinishFormComponent,
    UpdatableEmailStartFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgIconsModule.withIcons({
      appearanceIcon: BtsIcon.bootstrapBrush,
      arrowRightIcon: BtsIcon.bootstrapArrowRight,
      closeIcon: BtsIcon.bootstrapXLg,
      downloadIcon: BtsIcon.bootstrapDownload,
      languageIcon: BtsIcon.bootstrapTranslate,
      logoutIcon: BtsIcon.bootstrapBoxArrowRight,
      myAccountIcon: BtsIcon.bootstrapPerson,
      notificationsIcon: BtsIcon.bootstrapBell,
      profileIcon: BtsIcon.bootstrapPersonGear,
      togglerNoIcon: BtsIcon.bootstrapX,
      removeTrashIcon: BtsIcon.bootstrapTrashFill,
      togglerYesIcon: BtsIcon.bootstrapCheck,
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
