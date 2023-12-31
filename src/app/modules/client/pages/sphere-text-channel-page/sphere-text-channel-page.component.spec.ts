/*
 * Copyright (c) 2023 by Visphere & Vsph Technologies
 * Originally developed by Miłosz Gilga <https://miloszgilga.pl>
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModule } from '~/client-mod/client.module';
import { GuildService } from '~/client-mod/services/guild/guild.service';
import { MessagesService } from '~/client-mod/services/messages/messages.service';
import { TextChannelService } from '~/client-mod/services/text-channel/text-channel.service';
import { WsService } from '~/client-mod/services/ws/ws.service';
import { AppModule } from '~/root-mod/app.module';
import { SphereTextChannelPageComponent } from './sphere-text-channel-page.component';

describe('SphereTextChannelPageComponent', () => {
  let component: SphereTextChannelPageComponent;
  let fixture: ComponentFixture<SphereTextChannelPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ClientModule],
      providers: [WsService, MessagesService, GuildService, TextChannelService],
    }).compileComponents();
    fixture = TestBed.createComponent(SphereTextChannelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
