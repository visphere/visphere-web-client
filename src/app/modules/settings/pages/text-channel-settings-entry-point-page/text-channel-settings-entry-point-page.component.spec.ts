/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '~/root-mod/app.module';
import { TextChannelService } from '~/settings-mod/services/text-channel/text-channel.service';
import { SettingsModule } from '~/settings-mod/settings.module';
import { TextChannelSettingsEntryPointPageComponent } from './text-channel-settings-entry-point-page.component';

describe('TextChannelSettingsEntryPointPageComponent', () => {
  let component: TextChannelSettingsEntryPointPageComponent;
  let fixture: ComponentFixture<TextChannelSettingsEntryPointPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, SettingsModule],
      providers: [TextChannelService],
    }).compileComponents();
    fixture = TestBed.createComponent(
      TextChannelSettingsEntryPointPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
