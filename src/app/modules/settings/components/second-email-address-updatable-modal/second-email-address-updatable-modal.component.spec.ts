/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { SecondEmailAddressUpdatableModalComponent } from './second-email-address-updatable-modal.component';

describe('SecondEmailAddressUpdatableModalComponent', () => {
  let component: SecondEmailAddressUpdatableModalComponent;
  let fixture: ComponentFixture<SecondEmailAddressUpdatableModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [MyAccountSettingsService],
    }).compileComponents();
    fixture = TestBed.createComponent(
      SecondEmailAddressUpdatableModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
