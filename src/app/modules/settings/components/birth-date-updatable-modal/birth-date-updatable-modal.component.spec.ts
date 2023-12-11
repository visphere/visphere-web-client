/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { MyAccountSettingsService } from '~/settings-mod/services/my-account-settings/my-account-settings.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { BirthDateUpdatableModalComponent } from './birth-date-updatable-modal.component';

describe('BirthDateUpdatableModalComponent', () => {
  let component: BirthDateUpdatableModalComponent;
  let fixture: ComponentFixture<BirthDateUpdatableModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [MyAccountSettingsService],
    }).compileComponents();
    fixture = TestBed.createComponent(BirthDateUpdatableModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
