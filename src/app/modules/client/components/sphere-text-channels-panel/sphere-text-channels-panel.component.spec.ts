/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { TextChannelService } from '~/client-mod/services/text-channel/text-channel.service';
import { AppModule } from '~/root-mod/app.module';
import { SphereTextChannelsPanelComponent } from './sphere-text-channels-panel.component';

describe('SphereTextChannelsPanelComponent', () => {
  let component: SphereTextChannelsPanelComponent;
  let fixture: ComponentFixture<SphereTextChannelsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [GuildService, TextChannelService],
    }).compileComponents();
    fixture = TestBed.createComponent(SphereTextChannelsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
