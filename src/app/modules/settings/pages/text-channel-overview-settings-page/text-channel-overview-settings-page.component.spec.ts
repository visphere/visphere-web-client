/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { TextChannelService } from '~/settings-mod/services/text-channel/text-channel.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { TextChannelOverviewSettingsPageComponent } from './text-channel-overview-settings-page.component';

describe('TextChannelOverviewSettingsPageComponent', () => {
  let component: TextChannelOverviewSettingsPageComponent;
  let fixture: ComponentFixture<TextChannelOverviewSettingsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [TextChannelService],
    }).compileComponents();
    fixture = TestBed.createComponent(TextChannelOverviewSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
