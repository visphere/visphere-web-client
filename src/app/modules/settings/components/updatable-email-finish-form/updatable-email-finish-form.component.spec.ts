/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { UpdatableEmailService } from '~/settings-mod/services/updatable-email/updatable-email.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { UpdatableEmailFinishFormComponent } from './updatable-email-finish-form.component';

describe('UpdatableEmailFinishFormComponent', () => {
  let component: UpdatableEmailFinishFormComponent;
  let fixture: ComponentFixture<UpdatableEmailFinishFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [MyAccountSettingsService, UpdatableEmailService],
    }).compileComponents();
    fixture = TestBed.createComponent(UpdatableEmailFinishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
